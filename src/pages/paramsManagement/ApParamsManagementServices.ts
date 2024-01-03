import * as yup from "yup";
import ParamsManagementApi from "../../api/apParamsManagement/apParamsManagementApi";
import { ApParamsModel, GetParamsRequestModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";
import { OptionsFormType } from "../../model/components/FormCommonModel";
import AppInput from "../../component/appInput/AppInput";
import { ModalType } from "../../enum/commom";
import AppSelect from "../../component/appSelect/AppSelect";

export const fetchParamsList = async (params: GetParamsRequestModel) => {
  try {
    const { data } = await ParamsManagementApi.getListParams(params);
    return data;
  } catch (error) {

  }
};

export const fetchDeleteParam = async (param: any) => {
  try {
    const { data } = await ParamsManagementApi.deleteParam(param);
    return data;
  } catch (error) {}
};

export const fetchEditParam = async (param: any) => {
  try {
    const { data } = await ParamsManagementApi.editParam(param);
    return data;
  } catch (error) {}
};

export const fetchCreateParam = async (param: any) => {
  try {
    const { data } = await ParamsManagementApi.createParam(param);
    return data;
  } catch (error) {}
};

export const initApParamDetail: ApParamsModel = {
  description: "",
  id: "",
  parGroup: "",
  parName: "",
  parType: "",
  parValue: "",
};

export const formSchema = yup.object({
  parGroup: yup.string().nullable(),
  parType: yup.string().nullable(),
  parName: yup.string().nullable(),
  parValue: yup.string().nullable(),
});

export const options: OptionsFormType[] = [
  {
    component: AppInput,
    field: "parGroup",
    label: "Nhóm tham số",
    maxLength: 50,
  },

  {
    component: AppInput,
    field: "parType",
    label: "Loại tham số",
    maxLength: 50,
  },

  {
    component: AppInput,
    field: "parName",
    label: "Tên tham số",
    maxLength: 50,
  },

  {
    component: AppInput,
    field: "parValue",
    label: "Giá trị tham số",
    maxLength: 50,
  },

  {
    component: AppSelect,
    field: "applicationName",
    label: "Ứng dụng",
    typeSelectAsync: "applicationName"
  },
];

export const isDisabledEdit = (type: string) => type === ModalType.EDIT;
