import ManagementErrorEtcTransApi from "../../api/managementErrorEtcTrans/ManagementErrorEtcTransApi";
import { SearchErrorEtcTransModel } from "../../model/managementErrorEtcTrans/ManagementErrorEtcTrans";

export const fetchListPage = async (params: SearchErrorEtcTransModel) => {
  try {
    const { data } = await ManagementErrorEtcTransApi.getList(params);
    return data.data;
  } catch (error) {}
};
