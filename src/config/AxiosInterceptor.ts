
import axios, { type AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getLocalStorage, setLocalStorage } from "../helper/localStorage";
import { Authenticate, EIM } from "../enum/AuthorEnum";
import AuthApi from "../api/authApi";
import { authUrl } from "../api/baseUrl";
import { ErrorMessageVI } from "../enum/ErrorEnum";
import { ConfirmAlert } from "../component/alert/ComfirmAlert";
import { Modal } from "antd";
import { openNotification } from "../component/alert/Alert";
import AuthService from "../store/auth/AuthServeice";
import {
  alertMessageError,
  checkNetworkError,
  checkReponseError,
  checkReponseErrorGetSiteMap,
  checkRequestConfig,
  checkRequestGetSiteMap,
  checkRequestRefresh,
  checkRequestTimeout,
  checkResponseExport
} from "./axios/handleInterceptor";

const xApiKeyAuth = process.env.VITE_XAPIKEY_AUTH_URL;
const xApiKeyAction = process.env.VITE_XAPIKEY_ACTION_URL;
const PATH_CACHE = "/cache";
let countRefresh = 0;

let failedQueue: Array<Promise<AxiosResponse> | any> = [];

export const handleLogout: any = (logout: () => void) => {
  const fetchLogout = () => {
    Modal.destroyAll();
    logout();
  };

  ConfirmAlert({
    hideBtnCancal: true,
    title: "Cảnh báo",
    content: "Hết phiên đăng nhập. Vui lòng đăng nhập lại",
    handleOk: fetchLogout,
    hanleClose: fetchLogout,
    handleCancel: fetchLogout
  });
};

const processQueue = (token: string, logout: () => void) => {
  if (!token) {
    failedQueue = [];
    return handleLogout(logout);
  };
  failedQueue.forEach(promise => {
    axios(
      Object.assign({}, promise.config, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    ).then(response => {
      promise.resolve(response);
    }).catch(error => {
      promise.reject(error);
    });
  });
  failedQueue = [];
};

const refreshToken = async (error: any, logout: () => void) => {
  countRefresh += 1;
  if (countRefresh < 1) {
    const asscessToken = await refreshTokenAuth2();
    if (!asscessToken && countRefresh > 0) {
      handleLogout(logout);
      return;
    };
    if (asscessToken) {
      countRefresh = 0;
      error.config.headers = {
        Authorization: "Bearer " + asscessToken,
      };
      if (failedQueue.length !== 0) {
        processQueue(asscessToken, logout);
      }
      return await axios(error.config);
    }
  }
};

const refreshTokenAuth2 = async () => {
  const refreshTokenAuth2 = getLocalStorage(Authenticate.REFRESH_TOKEN);
  if (!refreshTokenAuth2) {
    failedQueue = [];
    return null;
  }
  if (refreshTokenAuth2) {
    const authService = new AuthService();
    const params = authService.getRequestBodyRefresh(refreshTokenAuth2);
    try {
      const { data } = await AuthApi.refreshToken(params);
      const { refreshToken, token } = data.data;
      // const expiresInDay = secondsToDays(expiresIn);
      // setCookie(Authenticate.AUTH, token, expiresInDay ?? 0.02);
      setLocalStorage({ key: Authenticate.AUTH, data: token });
      setLocalStorage({ key: Authenticate.REFRESH_TOKEN, data: refreshToken });
      return token;
    } catch (error) {
      return null;
    }
  }
};

export default function AxiosInterceptor(onUnauthenticated: () => void) {
  const onRequestSuccess = (config: AxiosRequestConfig): any => {
    const auth = getLocalStorage(Authenticate.AUTH);
    const sitesMap = getLocalStorage(EIM.SITE_MAP);
    const xApiKey = xApiKeyAuth;

    config.timeout = 120000;
    if (config?.url === authUrl) {
      config.headers = {
        ...config.headers,
        "device-id": "",
        "x-api-key": xApiKey,
        "app-code": EIM.APP_CODE,
        "app-code-eim": EIM.APP_CODE_EIM
      };
      return config;
    }
    if (checkRequestGetSiteMap(config, auth)) {
      config.headers = {
        ...config.headers,
        TRANS_ID: sitesMap,
      };
      return config;
    }
    if (auth) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + auth,
        "x-api-key": config.url?.includes(PATH_CACHE) ? config.headers?.["x-api-key"] : xApiKeyAction,
        "Content-Type": "application/json"
      };
      if (checkResponseExport(config)) {
        config.responseType = "blob";
      }
      return config;
    }
    return config;
  };

  const onResponseSuccess = (response: AxiosResponse) => {
    return response;
  };
  const onResponseError = (error: AxiosError<any>) => {
    if (checkReponseErrorGetSiteMap(error)) return handleLogout(onUnauthenticated);
    if (checkRequestConfig(error) ?? checkRequestRefresh(error)) return;
    if (checkRequestTimeout(error)) {
      openNotification({ description: ErrorMessageVI.TIMEOUT, type: "error" });
      return Promise.reject(ErrorMessageVI.TIMEOUT);
    }
    if (checkNetworkError(error)) {
      openNotification({ description: ErrorMessageVI.NETWORK_ERROR, type: "error" });
      return Promise.reject(ErrorMessageVI.NETWORK_ERROR);
    }
    if (checkReponseError(error)) {
      alertMessageError(error);
      return Promise.reject(error.response);
    } else if (error.response?.status === 401 && !error.config?.url?.includes(authUrl)) {
      failedQueue.push(error);
    }
    return refreshToken(error, onUnauthenticated);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}
