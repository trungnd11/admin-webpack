import { Spin } from "antd";
import { Suspense, useEffect, useMemo } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../component/breadcrumb/Breadcrumbs";
import routers from "../../routers/routers";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { SiderBarStore, closeMobileMenu, toggleMenuSlider } from "../../store/sider/sider";
import { ContentLoading, SliderListMenu } from "./contentWapperStyle";
import { handleAutoWidth, mapRoutersPage } from "./handleContentWapper";
import { flattenTreeArray } from "../../helper/functionCommon";
import SiderBar from "../SiderBar/SiderBar";
import { PathEnum } from "../../enum/PathEnum";

export default function ContentWapper() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed } = useAppSelector(SiderBarStore);
  const { showMenuM } = useAppSelector(SiderBarStore);
  const routersSider = useMemo(
    () =>
      mapRoutersPage(flattenTreeArray(routers)),
    []
  );

  useEffect(() => {
    handleAutoWidth(collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(PathEnum.PATH_RELOAD_CACHE, { replace: true });
    }
  }, [pathname, navigate]);
  const dispatch = useAppDispatch();

  // Check to set show menu mobile to false when user zoom
  let prevWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    if (currentWidth !== prevWidth) {
      dispatch(closeMobileMenu());
      prevWidth = currentWidth;
    }
  });

  return (
    <>
      <Breadcrumbs />
      <Suspense
        fallback={
          <ContentLoading className="loading">
            <Spin tip="Loading, please..." />
          </ContentLoading>
        }
      >
        <Routes>
          {routersSider}
        </Routes>
      </Suspense>

      {showMenuM && (
          <SliderListMenu onClick={() => dispatch(toggleMenuSlider())}>
            <div
              className="list-menu-slider"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <SiderBar />
            </div>
          </SliderListMenu>
      )}
    </>
  );
}
