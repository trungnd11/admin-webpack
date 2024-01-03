import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TypeConfigData } from "../../model/configDataModel/ConfigDataModel";
import { getConfigProductViewable, getTableList, mapOption } from "./asyncThunkHandle";

const initialState: TypeConfigData = {
  config: {
    applicationName: [],
    tableList: []
  }
};

const ConfigSelects = createSlice({
  name: "configSelects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfigProductViewable.fulfilled, (state, action) => {
      state.config = {
        ...state.config,
        applicationName: mapOption({ data: action?.payload, fieldValue: "parValue", fieldLabel: "parValue" })
      };
    })
      .addCase(getTableList.fulfilled, (state, action) => {
        state.config = {
          ...state.config,
          tableList: action?.payload.data.map((item: any) => {
            return {
              value: item,
              label: item
            };
          })
        };
      });
  }
});

export const getConfigStore = (state: RootState) => state.configSelect;
export default ConfigSelects.reducer;
