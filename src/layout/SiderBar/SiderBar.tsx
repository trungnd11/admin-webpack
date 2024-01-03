/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from "react";
import { Menu, MenuProps } from "antd";
import routers from "../../routers/routers";
import { RoutersModel } from "../../model/routersModel/RoutersModel";
import { NavLink, useLocation } from "react-router-dom";
import { IconDownStyle, SiderBarContainer } from "./siderBarStyle";
import { useAppSelector } from "../../store/reduxHook";
import { getSitesMapStore } from "../../store/sitesMap/sitesMap";
import { convertSiteMap, flatSiteMap } from "../../helper/siteMap";
import IconConfig from "../../config/iconConfig";
import { SiderBarStore } from "../../store/sider/sider";
import { isEmptyArray } from "../../ulti/arrayUlti";
import { getTitlePage, setTitle } from "../../helper/functionCommon";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const rootSubmenuKeys = routers.map((item) => item.id.toString());

export default function SiderBar() {
  const [openKeys, setOpenKeys] = useState<string[]>([
    routers[0].id.toString(),
  ]);
  const [selected, setSelected] = useState<string[]>();
  const { loading, sitesMap } = useAppSelector(getSitesMapStore);
  const { collapsed } = useAppSelector(SiderBarStore);
  const { pathname } = useLocation();

  const breadcrumb = (routes: RoutersModel[], preName?: string[]) => {
    for (let i = 0; i < routes?.length; i++) {
      const item = routes[i];
      if (item.path === pathname) {
        if (preName) {
          setSelected(() => [...preName, item.id.toString()]);
          return;
        } else {
          setSelected(() => [item.id.toString()]);
          return;
        }
      } else if (item.children) {
        preName
          ? breadcrumb(item.children, [...preName, item.id.toString()])
          : breadcrumb(item.children, [item.id.toString()]);
      }
      continue;
    }
  };

  const renderSliderMenu: any = (routes: RoutersModel[]) =>
    routes?.map((item) => {
      return !item.children
        ? getItem(
          <NavLink to={item.path} title={item.name}>
            {item.name.split(",").join("/")}
          </NavLink>,
          `${item.id}`,
          item.icon ? IconConfig[item.icon] : undefined,
        )
        : item.children &&
        getItem(
          `${item.name}`,
          `${item.id}`,
          item.icon ? IconConfig[item.icon] : undefined,
          renderSliderMenu(item.children)
        );
    });

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (!rootSubmenuKeys.includes(latestOpenKey!)) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelectItem: MenuProps["onSelect"] = (data) => {
    setOpenKeys((_pre) => data.keyPath);
  };

  const itemMenu = useMemo(
    () => renderSliderMenu(convertSiteMap(sitesMap)[0]?.children),
    [sitesMap]
  );

  useEffect(() => {
    breadcrumb(!loading ? convertSiteMap(sitesMap)[0]?.children : routers);
    !isEmptyArray(sitesMap) && setTitle(`Admin - ${getTitlePage(pathname, flatSiteMap(sitesMap[0]))}`);
  }, [pathname, sitesMap]);

  useEffect(() => {
    selected && setOpenKeys(() => selected);
  }, [selected]);

  return (
    <SiderBarContainer>
      <Menu
        mode="inline"
        inlineIndent={10}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={itemMenu}
        onSelect={onSelectItem}
        selectedKeys={selected}
        expandIcon={({ isOpen }) => {
          return !collapsed
            ? (
            <IconDownStyle rotate={isOpen ? 180 : 0} />
              )
            : null;
        }}
      />
    </SiderBarContainer>
  );
}
