import { isEmptyArray } from "../ulti/arrayUlti";

export const convertPrivileges = (item: any) => item?.childrent
  ? item.childrent
    .map((item: any) => {
      return isEmptyArray(item.childrent)
        ? [{ path: item.strUrl, privilege: item.privileges }]
        : convertPrivileges(item);
    }).flat()
  : [];

export const convertSiteMap: any = (items: any[]) =>
  Array.isArray(items)
    ? items.map((item: any) =>
      item.childrent.length === 0
        ? {
            id: item?.id,
            name: item?.strName,
            path: item?.strUrl,
            icon: item?.strIcon,
          }
        : {
            id: item?.id,
            name: item?.strName,
            path: item?.strUrl,
            icon: item?.strIcon,
            children: convertSiteMap(item.childrent),
          }
    )
    : [];

export const flatSiteMap = (item: any) => item?.childrent
  ? item.childrent
    .map((item: any) => {
      return isEmptyArray(item.childrent)
        ? { path: item.strUrl, name: item.strName }
        : flatSiteMap(item);
    }).flat()
  : [];
