import axios from "axios";
import { adminWalletUrl } from "../baseUrl";
import { SearchPageEntityModel } from "../../model/PageEntityModel/PageEntityModel";

const PageEntityApi = {
  pathCommon: "i/page",
  getListPage(params: SearchPageEntityModel) {
    const { page, size, ...restParams } = params;
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/search`,
      restParams,
      { params: { page, size } }
    );
  },

  deletePage(param: any) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/delete`, param);
  },

  editPage(param: any) {
    const { autoId, ...restParam } = param;
    return axios.put(`${adminWalletUrl}/${this.pathCommon}/update/${autoId}`, restParam);
  },

  createPage(param: any) {
    return axios.post(`${adminWalletUrl}/${this.pathCommon}/create`, param);
  }
};

export default PageEntityApi;
