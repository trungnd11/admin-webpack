import axios from "axios";
import { authRefreshUrl, authUrl, roleUrl } from "./baseUrl";
import { ResponseDataModel } from "../model/responseModel/ResponseModel";
import { LoginResponseEim } from "../model/authorModel/LoginModel";

const AuthApi = {
  login(info: URLSearchParams) {
    return axios.post<ResponseDataModel<LoginResponseEim>>(authUrl, info);
  },
  refreshToken(info: URLSearchParams) {
    return axios.post<ResponseDataModel<LoginResponseEim>>(authRefreshUrl, info);
  },
  getSiteMap(props: { appCode: string }) {
    return axios.get(`${roleUrl}/sitemaps-for-role-prl/${props.appCode}&ACCESS`, {
      params: null,
    });
  },
};

export default AuthApi;
