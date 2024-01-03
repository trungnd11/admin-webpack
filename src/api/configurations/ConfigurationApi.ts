import axios from "axios";
import { adminWalletUrl } from "../baseUrl";
import { ResponseDataModel } from "../../model/responseModel/ResponseModel";
import { ConfigurationSearchParams, ConfigurationModel } from "../../model/configurationModel/ConfigurationModel";

interface ReqBodyDelete {
  idConfig: number
  reason: string
}

const ConfigurationApi = {
  pathCommon: "i/configuration",
  getListConfigs(params: ConfigurationSearchParams) {
    const { page, size, ...restParams } = params;
    return axios.post<ResponseDataModel<ConfigurationModel[]>>(`${adminWalletUrl}/${this.pathCommon}/search`,
      restParams,
      {
        params: { page, size }
      });
  },

  deleteConfig(reqBody: ReqBodyDelete) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/delete`, reqBody);
  },

  getDetailConfig(param: any) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/detail`, param);
  },

  createConfig(param: any) {
    const { autoId, status, ...restParam } = param;
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/create`, restParam);
  },

  editConfig(param: any) {
    const { autoId, ...restParam } = param;
    return axios.put(`${adminWalletUrl}/${this.pathCommon}/update/${autoId}`, restParam);
  }
};

export default ConfigurationApi;
