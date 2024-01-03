import { FieldValues, UseFormSetValue } from "react-hook-form";
import { ObjectSchema } from "yup";
import { Gutter } from "antd/es/grid/row";
import { TypeConfig } from "../configDataModel/ConfigDataModel";
import { TypeSelectApp } from "./AppSelectModel";
import { DefaultOptionType } from "antd/es/select";
import { IconButtonType } from "./AppButtonModel";
import { FormLayout } from "antd/es/form/Form";

export interface RequiredListType {
  field: string
  required: boolean
  errorMessage: string
}

export interface OnChangeType {
  field: string
  value: any
  setValue?: UseFormSetValue<any>
};

export interface LayoutProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
};

export interface OptionsFormType {
  label?: string
  field: string
  component: JSX.Element | any
  initValue?: any
  multiple?: boolean
  layout?: LayoutProps
  typeSelectAsync?: keyof TypeConfig
  typeSelect?: keyof TypeSelectApp
  viewDateType?: "date" | "month" | "quarter" | "year"
  pickerDate?: "date" | "month" | "quarter" | "year"
  optionSelect?: DefaultOptionType[]
  typeComponent?: "input" | "select" | "date"
  required?: boolean
  allowClearSelect?: boolean
  checkValue?: (value: any, option?: Record<string, any>) => boolean
  addAll?: boolean
  type?: string
  maxLength?: number
  options?: any
  dependentField?: string[]
  mode?: string
  disabled?: boolean
  placeholder?: string
  filterOptions?: any
  combineField?: string[]
  hidden?: boolean
  invisible?: boolean
};

export interface FormCommonModel<T> {
  titleSearch?: React.ReactNode | string
  titleResult?: React.ReactNode | string
  options: OptionsFormType[]
  initValueForm?: Record<string, any>
  gutter?: Gutter | [Gutter, Gutter]
  children?: JSX.Element
  layoutCommon?: LayoutProps
  isShowBtnExport?: boolean
  isShowBtnPayBatch?: boolean
  layoutWrapperButton?: LayoutProps
  loadingBtnSearch?: boolean
  loadingBtnExport?: boolean
  disableBtnExport?: boolean
  disableBtnPayBatch?: boolean
  messageDisableExport?: string
  formItem?: boolean
  schema?: ObjectSchema<any, any>
  labelBtnSubmit?: string
  typeIconBtnSubmit?: IconButtonType
  onSearch?: (form?: T) => void
  onExport?: () => void
  onChange?: (form: OnChangeType) => void
  onHandleSubmit?: ((data: FieldValues) => void) | ((value: FieldValues) => Promise<void>)
  onPayBatch?: () => void
  resetField?: boolean
  isShowBtnCreate?: boolean
  labelBtnCreate?: string
  onCreate?: () => void
  disableBtnCreate?: boolean
  noBorder?: boolean
  isShowBtnClose?: boolean
  onClose?: () => void
  isShowSubmit?: boolean
  ref?: any
  isCreatePolicy?: boolean
  isDisableSubmit?: boolean
  values?: any
  layout?: FormLayout | undefined
  isShowBtnSearch?: boolean
  buttonAlight?: "center" | "end" | "start" | undefined
};

export interface IFormRef {
  setValue: Function
  formState?: any
  reset: Function
}
