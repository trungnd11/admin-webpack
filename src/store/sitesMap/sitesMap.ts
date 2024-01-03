import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "..";
import AuthApi from "../../api/authApi";
import { EIM } from "../../enum/AuthorEnum";
import { convertPrivileges } from "../../helper/siteMap";

interface InitState {
  loading: boolean
  sitesMap: any[]
  privileges: any[]
};

const initialState: InitState = {
  loading: true,
  sitesMap: [],
  privileges: [],
};

export const getSitesMap = createAsyncThunk("eim/getSitesMap", async () => {
  const response = await AuthApi.getSiteMap({ appCode: EIM.APP_CODE_EIM });
  return response.data;
});

const SitesMap = createSlice({
  name: "sitesMap",
  initialState,
  reducers: {
    clearSitesMap: (state) => {
      state.loading = true;
      state.sitesMap = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSitesMap.fulfilled, (state, action) => {
      state.loading = false;
      state.sitesMap = action.payload?.data?.sitemaps;
      state.privileges = convertPrivileges(action.payload?.data?.sitemaps[0]);
    });
  }
});

export const getSitesMapStore = (state: RootState) => state.sitesMap;
export const { clearSitesMap } = SitesMap.actions;
export default SitesMap.reducer;
