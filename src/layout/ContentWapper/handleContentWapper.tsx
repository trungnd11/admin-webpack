import { Route } from "react-router-dom";
import { RoutersModel } from "../../model/routersModel/RoutersModel";

export const mapRouters: any = (routes: RoutersModel[]) => {
  return routes.map((item) =>
    !item.children
      ? (
        <Route key= { item.id } path = { item.path } element = {< item.element />} />
        )
      : (
          mapRouters(item.children)
        )
  );
};

export const mapRoutersPage: any = (routes: RoutersModel[]) =>
  routes.map((item) => (
    <Route key= { item.id } path = { item.path } element = {< item.element />} />
  ));

export const handleAutoWidth = (collapsed: boolean) => {
  const sider = document.getElementById("sider");
  const content = document.getElementById("content");
  const trigger = document.getElementById("trigger");
  const breadcrumb = document.getElementById("breadcrumbs-wrapper");
  if (sider && content && trigger && breadcrumb) {
    new ResizeObserver((_entries) => {
      trigger.style.width = `${sider.offsetWidth}px`;
      breadcrumb.style.width = `calc(100% - ${sider.offsetWidth}px)`;
      content.style.marginLeft = `${sider.offsetWidth}px`;
      content.style.marginTop = `${breadcrumb.offsetHeight + 64}px`;
      if (collapsed) {
        trigger.style.justifyContent = "center";
      }
    }).observe(sider);
  }
};
