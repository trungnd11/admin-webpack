import { EIM, RefreshTokenParam } from "../../enum/AuthorEnum";
import { LoginModel } from "../../model/authorModel/LoginModel";

export default class AuthService {
  public getRequestBodyLogin(user: LoginModel) {
    const params = new URLSearchParams();
    params.append("client_id", EIM.CLIENT_ID);
    params.append("username", user.username);
    params.append("password", user.password);
    params.append("grant_type", EIM.PASSWORD);
    params.append("client_secret", EIM.CLIENT_SECRET);
    params.append("app_code", EIM.APP_CODE);
    params.append("app_code_eim", EIM.APP_CODE_EIM);
    return params;
  };

  public getRequestBodyRefresh(refreshToken: string) {
    const params = new URLSearchParams();
    params.append("realms", RefreshTokenParam.REALMS);
    params.append("client_id", RefreshTokenParam.CLIENT_ID);
    params.append("grant_type", RefreshTokenParam.GRANT_TYPE);
    params.append("client_secret", RefreshTokenParam.CLIENT_SECRET);
    params.append("refresh_token", refreshToken);
    return params;
  }
};
