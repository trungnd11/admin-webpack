export enum Authenticate {
  AUTH = "auth",
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  TIME_OUT_LOGOUT = "timer"
};

export enum EIM {
  SITE_MAP = "site-map",
  CLIENT_ID = "newClient",
  PASSWORD = "password",
  CLIENT_SECRET = "e75cPWjZ2UBFNVo2tdyvxwDTERiO854c",
  APP_CODE_EIM = "VETC.WALLET.ADMIN",
  APP_CODE = "APP_EIM",
};

export enum FormLogin {
  USERNAME = "username",
  PASSWORD = "password",
  REMEMBER = "remember"
};

export enum RefreshTokenParam {
  REALMS = "EIM",
  CLIENT_ID = "newClient",
  GRANT_TYPE = "refresh_token",
  CLIENT_SECRET = "e75cPWjZ2UBFNVo2tdyvxwDTERiO854c"
};
