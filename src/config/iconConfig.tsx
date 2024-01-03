import { SwapOutlined } from "@ant-design/icons";
import { lazy } from "react";
const ReloadOutlined = lazy(async () => await import("@ant-design/icons/ReloadOutlined"));
const SettingOutlined = lazy(async () => await import("@ant-design/icons/SettingOutlined"));
const HistoryOutlined = lazy(async () => await import("@ant-design/icons/HistoryOutlined"));

const IconConfig: any = {
  ReloadOutlined: <ReloadOutlined />,
  SettingOutlined: <SettingOutlined />,
  SwapOutlined: <SwapOutlined />,
  HistoryOutlined: <HistoryOutlined />
};

export default IconConfig;
