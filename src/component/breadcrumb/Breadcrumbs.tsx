import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { RoutersModel } from "../../model/routersModel/RoutersModel";
import routers from "../../routers/routers";
import { BreadcrumbContainer } from "./breadcrumbStyle";

interface TypeBreadcrumbs {
  name: string
  icon: string
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const [breadcrumbsNameSider, setBreadcrumbsNameSider] = useState<TypeBreadcrumbs[]>();

  const breadcrumbs = (routes: RoutersModel[], preName?: TypeBreadcrumbs[]) => {
    for (let i = 0; i < routes.length; i++) {
      const breadcrumb = routes[i];
      if (breadcrumb.path === pathname) {
        if (preName) {
          setBreadcrumbsNameSider(() => [...preName, { name: breadcrumb.name, icon: breadcrumb?.icon }]);
          return;
        } else {
          setBreadcrumbsNameSider(() => [{ name: breadcrumb.name, icon: breadcrumb?.icon }]);
          return;
        }
      } else if (breadcrumb.path === "/home") {
        continue;
      } else if (breadcrumb.children) {
        preName
          ? breadcrumbs(breadcrumb.children, [...preName, { name: breadcrumb.name, icon: breadcrumb?.icon }])
          : breadcrumbs(breadcrumb.children, [{ name: breadcrumb.name, icon: breadcrumb?.icon }]);
      }
      continue;
    }
  };

  useEffect(() => {
    breadcrumbs(routers);
  }, [pathname]);

  return (
    <BreadcrumbContainer id="breadcrumbs-wrapper">
      <Breadcrumb separator="/">
        {
          breadcrumbsNameSider?.map((item, index) => {
            return (
              item.name !== "Home" &&
              <Breadcrumb.Item
                key={index}
                className={index === breadcrumbsNameSider.length - 1 ? "last-item" : ""}
              >
                <span>{item.name}</span>
              </Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
    </BreadcrumbContainer>
  );
}
