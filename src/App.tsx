
import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { useIdleTimer } from "react-idle-timer";
import { Provider } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ConfigProvider, ThemeConfig } from "antd";
import "./index.scss";
import queryClient from "./config/queryClient";
import AuthorizedRouter from "./routers/AuthorizedRouter";
import ProtectedRouter from "./routers/ProtectedRouter";
import { useAppDispatch, useAppSelector } from "./store/reduxHook";
import { Authenticate } from "./enum/AuthorEnum";
import { getAuthorStore, getLogin, logout, clearAuthentication } from "./store/auth/auth";
import { getLocalStorage } from "./helper/localStorage";
import AxiosInterceptor, { handleLogout } from "./config/AxiosInterceptor";
import store from "./store";
import { MainColor } from "./component/variable";
import { GlobalStyle } from "./component/commonStyle/CommonStyle";

const Container = lazy(async () => await import("./layout/Container/Container"));
const LoginPage = lazy(async () => await import("@pages/login/LoginPage"));

export default function App() {
  const timerLogout = getLocalStorage(Authenticate.TIME_OUT_LOGOUT);
  const dispatch = useAppDispatch();
  const { timeout } = useAppSelector(getAuthorStore);
  const auth = getLocalStorage(Authenticate.AUTH);

  const handleIdleTimer = () => {
    handleLogout(() => dispatch(logout()));
  };

  useIdleTimer({
    syncTimers: timeout,
    timeout: timerLogout ? Number(timerLogout) : undefined,
    onIdle: handleIdleTimer
  });

  if (auth) dispatch(getLogin());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRouter>
                <LoginPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="*" element={
              <AuthorizedRouter>
                <Container />
              </AuthorizedRouter>}
          />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

const action = bindActionCreators({ clearAuthentication }, store.dispatch);
AxiosInterceptor(() => {
  action.clearAuthentication();
});

const config: ThemeConfig = {
  token: {
    colorPrimary: MainColor,
    colorPrimaryText: MainColor,
    colorLink: MainColor,
    colorLinkHover: "#1eb361",
  },
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={config}>
          <App />
          <GlobalStyle />
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
