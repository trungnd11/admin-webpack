import axios from "axios";
import { adminWalletUrl } from "../baseUrl";
import { GetParamsRequestModel, ApParamsModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";
import { ResponseDataModel } from "../../model/responseModel/ResponseModel";

const ParamsManagementApi = {
  pathCommon: "i/ap_param",
  getListParams(params: GetParamsRequestModel) {
    const { page, size, ...restParams } = params;
    return axios.post<ResponseDataModel<ApParamsModel[]>>(`${adminWalletUrl}/${this.pathCommon}/search`,
      restParams,
      { params: { page, size } });
  },

  deleteParam(param: any) {
    return axios.delete(`${adminWalletUrl}/${this.pathCommon}/delete`, { data: param });
  },

  editParam(param: any) {
    const { id, ...restParam } = param;
    return axios.put(`${adminWalletUrl}/${this.pathCommon}/update/${id}`, restParam);
  },

  getDetailParams(param: any) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/detail`, param);
  },

  createParam(param: any) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/create`, param);
  },

  getApplicationNames() {
    return axios.get(`${adminWalletUrl}/i/ap_param/load-param-by-group?group-code=E_ADMIN&par-type=APP_NAME`);
  },
};

export default ParamsManagementApi;
