import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const initialState = {
  collapsed: false,
  showMenuM: false
};

const SiderBar = createSlice({
  name: "siderBar",
  initialState,
  reducers: {
    toggleSiderBar: (state) => {
      state.collapsed = !state.collapsed;
    },
    closeSiderBar: (state) => {
      state.collapsed = true;
    },
    openSiderBar: (state) => {
      state.collapsed = false;
    },
    toggleMenuSlider: (state) => {
      state.showMenuM = !state.showMenuM;
    },
    closeMobileMenu(state) {
      state.showMenuM = false;
    }
  }
});

export const SiderBarStore = (state: RootState) => state.siderBar;
export const { toggleSiderBar, closeSiderBar, openSiderBar, toggleMenuSlider, closeMobileMenu } =
  SiderBar.actions;
export default SiderBar.reducer;
