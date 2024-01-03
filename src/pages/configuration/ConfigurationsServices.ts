import * as yup from "yup";
import ConfigurationApi from "../../api/configurations/ConfigurationApi";
import { ConfigurationSearchParams } from "../../model/configurationModel/ConfigurationModel";

export const fetchConfigList = async (params: ConfigurationSearchParams) => {
  try {
    const { data } = await ConfigurationApi.getListConfigs(params);
    return data;
  } catch (error) {

  }
};

export const fetchDeleteConfig = async (param: any) => {
  try {
    const { data } = await ConfigurationApi.deleteConfig(param);
    return data;
  } catch (error) {}
};

export const fetchDetailConfig = async (param: any) => {
  try {
    const { data } = await ConfigurationApi.createConfig(param);
    return data;
  } catch (error) {}
};

export const fetchEditConfig = async (param: any) => {
  try {
    const { data } = await ConfigurationApi.editConfig(param);
    return data;
  } catch (error) {}
};

export const initValueConfiguration = {
  description: "",
  autoId: "",
  gr: "",
  name: "",
  code: "",
  status: "",
  value: "",
};

export const formSchema = yup.object({
  parGroup: yup.string().nullable(),
  parType: yup.string().nullable(),
  parName: yup.string().nullable(),
  parValue: yup.string().nullable(),
});
