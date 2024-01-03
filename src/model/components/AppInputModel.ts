import { InputProps } from "antd";
import { CommomInputModel } from "../commonModel/CommonModel";

export interface AppInputModel extends InputProps, CommomInputModel {
  onChangeInput?: (value: string) => void
};
