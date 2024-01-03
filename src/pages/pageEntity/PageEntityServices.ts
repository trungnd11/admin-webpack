import PageEntityApi from "../../api/pagesEntityApi/PageEntityApi";
import AppInput from "../../component/appInput/AppInput";
import { PageEntityModel, SearchPageEntityModel } from "../../model/PageEntityModel/PageEntityModel";
import { OptionsFormType } from "../../model/components/FormCommonModel";

export const fetchListPage = async (params: SearchPageEntityModel) => {
  try {
    const { data } = await PageEntityApi.getListPage(params);
    return data;
  } catch (error) {}
};

export const fetchDeletePage = async (param: any) => {
  try {
    const { data } = await PageEntityApi.deletePage(param);
    return data;
  } catch (error) {}
};

export const fetchEditPage = async (param: any) => {
  try {
    const { data } = await PageEntityApi.editPage(param);
    return data;
  } catch (error) {}
};

export const fetchCreatePage = async (param: any) => {
  try {
    const { data } = await PageEntityApi.createPage(param);
    return data;
  } catch (error) {}
};

export const pageEntityEmptyData: PageEntityModel = {
  autoId: "",
  title: "",
  brief: "",
  ord: "",
  createdBy: "",
  createdAt: "",
  status: "",
  modifiedAt: "",
  modifiedBy: "",
  code: "",
  cataId: "",
  content: "",
};

export const options: OptionsFormType[] = [
  {
    component: AppInput,
    field: "title",
    label: "Tiêu đề",
    maxLength: 50,
  },

  {
    component: AppInput,
    field: "brief",
    label: "Tên",
    maxLength: 50,
  },
];
