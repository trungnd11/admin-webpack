import { DatePickerProps } from "antd";
import { CommomInputModel } from "../commonModel/CommonModel";

export interface AppDatePickerModel extends Omit<DatePickerProps, "ref">, CommomInputModel {
  title?: string
  required?: boolean
  onKeyPress?: Function
  validateText?: string
};
