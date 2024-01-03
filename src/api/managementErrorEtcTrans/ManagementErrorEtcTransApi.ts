import axios from "axios";
import { adminWalletUrl } from "../baseUrl";

const ManagementErrorEtcTransApi = {
  getList(params: any) {
    const { page, size, ...restParams } = params;
    return axios.post(`${adminWalletUrl}/i/sync-transaction/search`,
      restParams,
      { params: { page, size } }
    );
  },

  reloadTransaction(id: string) {
    return axios.post(`${adminWalletUrl}/i/sync-transaction/retry-transaction`, { syncTransactionId: id });
  },
};

export default ManagementErrorEtcTransApi;
