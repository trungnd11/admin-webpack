import { lazy } from "react";
import { RoutersModel } from "../model/routersModel/RoutersModel";
import { generateId } from "../ulti/genertateIdUlti";

const Home = lazy(async () => await import("../pages/home/Home"));
const ReloadCache = lazy(async () => await import("../pages/reloadCache/ReloadCache"));
const ParamsManagement = lazy(async () => await import("../pages/paramsManagement/ApParamsManagement"));
const Configuration = lazy(async () => await import("../pages/configuration/Configuration"));
const PageEntity = lazy(async () => await import("../pages/pageEntity/PageEntity"));
const ManagementErrorEtcTrans = lazy(async () => await import("../pages/managementErrorEtcTrans/ManagementErrorEtcTrans"));
const HistoryAction = lazy(async () => await import("../pages/historyAction/HistoryAction"));
// const ActionsAudit = lazy(async () => await import("../pages/actionsAudit/ActionsAudit"));

const routers: RoutersModel[] = [
  {
    id: generateId(),
    name: "Tải lại cache",
    path: "/reload-cache",
    element: ReloadCache,
  },
  {
    id: generateId(),
    name: "Cấu hình hệ thống",
    path: "/setting-systems",
    element: Home,
    children: [
      {
        id: generateId(),
        name: "Tham số hệ thống",
        path: "/sys/ap-params",
        element: ParamsManagement,
      },
      {
        id: generateId(),
        name: "Cấu hình hệ thống",
        path: "/sys/configuration",
        element: Configuration,
      },
      {
        id: generateId(),
        name: "Trang chính sách",
        path: "/sys/page-entity",
        element: PageEntity,
      },
    ]
  },
  // {
  //   id: generateId(),
  //   name: "Ghi action audit",
  //   path: "/actions-audit",
  //   element: ActionsAudit,
  // },
  {
    id: generateId(),
    name: "Quản lý giao dịch",
    path: "/management-trans",
    element: Home,
    children: [
      {
        id: generateId(),
        name: "Giao dịch đồng bộ ETC lỗi",
        path: "/management-trans/etc-error",
        element: ManagementErrorEtcTrans,
      },
    ]
  },
  {
    id: generateId(),
    name: "Lịch sử tác động",
    path: "/history-action",
    element: HistoryAction,
  },
];

export default routers;
