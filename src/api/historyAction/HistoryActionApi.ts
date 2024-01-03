import axios from "axios";
import { adminWalletUrl } from "../baseUrl";
import { SearchHistoryAction } from "../../model/historyAction/historyActionModel";

const HistoryActionApi = {
  getListParams(params: SearchHistoryAction) {
    const { page, size, ...restParams } = params;
    return axios.post(`${adminWalletUrl}/i/logging/search`,
      restParams,
      { params: { page, size } });
  },

  getTableList() {
    return axios.get(`${adminWalletUrl}/i/logging/loadDataByKey`);
  }
};

export default HistoryActionApi;
