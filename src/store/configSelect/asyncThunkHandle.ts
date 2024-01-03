import { createAsyncThunk } from "@reduxjs/toolkit";
import ParamsManagementApi from "../../api/apParamsManagement/apParamsManagementApi";
import HistoryActionApi from "../../api/historyAction/HistoryActionApi";

export const mapOption = (props: { data: any[], fieldValue: string, fieldLabel: string }) => {
  const { data, fieldLabel, fieldValue } = props;
  return data.map((item: any) => ({ ...item, value: item[fieldValue], label: item[fieldLabel] }));
};

export const mergedData = (data: any[]) => {
  return Object.values(
    data.reduce((acc: any, item) => {
      if (!acc[item.prodId]) {
        acc[item.prodId] = { ...item };
      } else {
        if (!Array.isArray(acc[item.prodId].cateId)) {
          acc[item.prodId].cateId = [acc[item.prodId].cateId];
        }
        acc[item.prodId].cateId.push(item.cateId);
      }
      return acc;
    }, {})
  );
};

export const getConfigProductViewable = createAsyncThunk("fetchProductViewable", async () => {
  const { data } = await ParamsManagementApi.getApplicationNames();
  return data;
});

export const getTableList = createAsyncThunk("fetchTableList", async () => {
  const { data } = await HistoryActionApi.getTableList();
  return data;
});
