import { SelectProps } from "antd";
import { BaseOptionType } from "antd/es/select";
import { TypeConfig } from "../configDataModel/ConfigDataModel";
import { CommomInputModel } from "../commonModel/CommonModel";

export interface AppOptionType extends BaseOptionType {
  value: string
  label: string
};

export interface TypeSelectApp {
  month: AppOptionType[]
};

export interface AppSelectModel<T = any> extends SelectProps<T>, CommomInputModel {
  title?: string
  typeSelect?: keyof TypeSelectApp
  typeSelectAsync?: keyof TypeConfig
  required?: boolean
  addAll?: boolean
  filterOptions?: any
  combineField?: string[]
};
