import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "..";
import AuthApi from "../../api/authApi";
import { LoginModel } from "../../model/authorModel/LoginModel";
import { getTransId } from "../../helper/jwt";
import { Authenticate, EIM } from "../../enum/AuthorEnum";
import { removeLocalStorage, setLocalStorage } from "../../helper/localStorage";
import ApParamApi from "../../api/paramConfigApi";
import { ApParamGroupCode } from "../../enum/ApParamEnum";
import AuthService from "./AuthServeice";

const authService = new AuthService();

export interface InitialStateAuthor {
  loadding: boolean
  username: string
  accessToken: string
  refreshToken: string
  isAuthentication: boolean
  timeout: number
};

const initialState: InitialStateAuthor = {
  username: "",
  accessToken: "",
  refreshToken: "",
  isAuthentication: false,
  loadding: false,
  timeout: 0
};

export const clearAuthentication = () => (dispatch: any) => {
  dispatch(logout());
};

export const loginEim = createAsyncThunk(
  "authentication/eim",
  async (user: LoginModel) => {
    const params = authService.getRequestBodyLogin(user);
    const { data } = await AuthApi.login(params);
    return data;
  }
);

export const getConfigTimeout = createAsyncThunk("apParam/timeout-logout", async () => {
  const res = await ApParamApi.getParNameByParGroup({ parGroup: ApParamGroupCode.TIME_OUT_LOGOUT_ACCT });
  return res.data;
});

const Authorized = createSlice({
  name: "authorized",
  initialState,
  reducers: {
    getLogin: (state) => {
      state.isAuthentication = true;
    },
    logout: (state) => {
      state.isAuthentication = false;
      state.timeout = 0;
      state.username = "";
      state.accessToken = "";
      state.refreshToken = "";
      removeLocalStorage(Authenticate.AUTH);
      removeLocalStorage(Authenticate.REFRESH_TOKEN);
      removeLocalStorage(EIM.SITE_MAP);
      removeLocalStorage(Authenticate.TIME_OUT_LOGOUT);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEim.pending, (state, _action) => {
        state.loadding = true;
      })
      .addCase(loginEim.fulfilled, (state, action) => {
        if (!action.payload?.data?.token) {
          state.loadding = false;
          state.isAuthentication = false;
          return;
        }
        const { refreshToken, token } = action.payload.data;
        state.loadding = false;
        state.isAuthentication = true;
        setLocalStorage({ key: Authenticate.AUTH, data: token });
        setLocalStorage({ key: Authenticate.REFRESH_TOKEN, data: refreshToken });
        getTransId(action.payload.data.token) && setLocalStorage({
          key: EIM.SITE_MAP,
          data: getTransId(action.payload.data.token),
        });
      })
      .addCase(loginEim.rejected, (state) => {
        state.loadding = false;
        state.isAuthentication = false;
      }).addCase(getConfigTimeout.fulfilled, (state, action) => {
        const timeout = Number(action.payload?.[0]?.parValue);
        state.timeout = timeout;
        setLocalStorage({ key: Authenticate.TIME_OUT_LOGOUT, data: timeout });
      });
  },
});

export const getAuthorStore = (state: RootState) => state.author;
export const { logout, getLogin } = Authorized.actions;
export default Authorized.reducer;
