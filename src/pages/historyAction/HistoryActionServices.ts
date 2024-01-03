import HistoryActionApi from "../../api/historyAction/HistoryActionApi";

export const fetchListHistoryAction = async (params: any) => {
  try {
    const data = await HistoryActionApi.getListParams(params);
    return data.data;
  } catch (error) {}
};
