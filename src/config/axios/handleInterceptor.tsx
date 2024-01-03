import { AxiosError, AxiosRequestConfig } from "axios";
import { Authenticate } from "../../enum/AuthorEnum";
import { ErrorCode, ErrorMessage } from "../../enum/ErrorEnum";
import { getCookie } from "../../helper/cookie";
import { openNotification } from "../../component/alert/Alert";
import { convertBlobToString } from "../../helper/exportFile";
import { PathEnum } from "../../enum/PathEnum";
import { authUrl } from "../../api/baseUrl";

export const checkRequestGetSiteMap = (config: AxiosRequestConfig<any>, auth: string | null) =>
  typeof config.url !== "object" && config?.url?.includes(PathEnum.PATH_SITEMAP) && auth;

export const checkReponseErrorGetSiteMap = (error: AxiosError<any>) =>
  error.config?.url?.includes(PathEnum.PATH_SITEMAP);

export const checkResponseExport = (config: AxiosRequestConfig<any>) =>
  typeof config.url !== "object" &&
  (config.url?.includes(PathEnum.PATH_EXPORT_EXCEL) ?? config.url?.includes(PathEnum.PATH_EXPORT_FILE));

export const checkRequestConfig = (error: AxiosError<any>) =>
  error.config?.url?.includes(PathEnum.PATH_PARAM_CONFIG) ??
  error.config?.url?.includes(PathEnum.PATH_PARTNER_CONFIG);

export const checkRequestRefresh = (error: AxiosError<any>) =>
  error.config?.url?.includes(PathEnum.PATH_REFRESH_TOKEN);

export const checkNetworkError = (error: AxiosError<any>) => {
  const auth = getCookie(Authenticate.AUTH);
  return auth && error?.message === ErrorMessage.NETWORK_ERROR;
};

export const checkRequestTimeout = (error: AxiosError<any>) =>
  error.code === ErrorCode.TIMEOUT || error?.response?.status === ErrorCode.TIMEOUT_CODE;

export const checkReponseError = (error: AxiosError<any>) => {
  const auth = getCookie(Authenticate.AUTH);
  return (error.response?.status !== 401 && auth) ?? error.config?.url?.includes(authUrl);
};

export const alertMessageError = (error: AxiosError<any>) => {
  if (error.response?.data?.type === "application/json") {
    const data = error.response?.data;
    convertBlobToString(data).then(jsonData => {
      const errData = JSON.parse(jsonData);
      const errMessage: any = errData;
      openNotification({ description: errMessage?.message, type: "error" });
    });
  } else {
    const errMessage: any = error.response?.data?.message ?? error.response?.data ?? error?.response ?? error;
    if (errMessage.includes("; ")) {
      const listErrString: string[] = errMessage.split("; ");
      const errNode = listErrString.map(messErr => (
        <>
          <p>{ messErr }</p>
        </>
      ));
      return openNotification({ description: errNode, type: "error" });
    }
    errMessage && openNotification({ description: errMessage, type: "error" });
  }
};
