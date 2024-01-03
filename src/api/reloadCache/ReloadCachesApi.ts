import axios from "axios";
import { adminWalletUrl } from "../baseUrl";
import { ReloadCacheSearchParams } from "../../model/reloadCacheModel/ReloadCacheModel";
import { ResponseDataModel } from "../../model/responseModel/ResponseModel";
import { ApParamsModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";

const ReloadCacheApi = {
  pathCommon: "i/ap_param",
  getList(params: ReloadCacheSearchParams) {
    const { page, size, ...reqBody } = params;
    return axios.post<ResponseDataModel<ApParamsModel[]>>(`${adminWalletUrl}/${this.pathCommon}/search`,
      reqBody, { params: { page, size } });
  },
  reloadCache(url: string, type: any, config?: any) {
    return axios({ url, method: type, ...config });
  }
};

export default ReloadCacheApi;
