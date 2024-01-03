import { combineReducers } from "@reduxjs/toolkit";
import siderBar from "./sider/sider";
import author from "./auth/auth";
import sitesMap from "./sitesMap/sitesMap";
import configSelect from "./configSelect/configSelect";

export const rootReducer = combineReducers({
  siderBar,
  author,
  sitesMap,
  configSelect
});
