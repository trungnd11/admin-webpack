import axios from "axios";
import { adminWalletUrl } from "./baseUrl";

const ApParamApi = {
  getParNameByParGroup(props: {
    parGroup?: string
    orderField?: string
    orderType?: boolean
    parType?: string
    id?: number
  }) {
    const { parGroup } = props;
    return axios.get(`${adminWalletUrl}/i/load-param-by-group?limit=10000`,
      { params: { "group-code": parGroup } });
  },
};

export default ApParamApi;
