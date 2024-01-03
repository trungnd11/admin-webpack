import { dataConfigLocal } from "../../../config/dataConfig";
import { OptionsFormType } from "../../../model/components/FormCommonModel";
import { TypeConfig } from "../../../model/configDataModel/ConfigDataModel";
import { isArray } from "../../../ulti/arrayUlti";
import { formatDateToString, formatYearToDate, isDate } from "../../../ulti/dateUlti";
import { isObject } from "../../../ulti/objectUlti";

export const getInitLayout = (item: OptionsFormType) => {
  return {
    xs: item.layout?.xs ?? 24,
    sm: item.layout?.sm ?? 24,
    md: item.layout?.md ?? 12,
    lg: item.layout?.lg ?? 12,
    xl: item.layout?.xl ?? 8,
    xxl: item.layout?.xxl ?? 6
  };
};

export const getInitValue = (option: OptionsFormType) => {
  if (option.multiple && !option.initValue) {
    return [];
  }
  if (isDate(option.initValue)) {
    return formatDateToString({ date: option.initValue });
  }
  if (isArray(option.initValue)) {
    return null;
  }
  if (isObject(option.initValue)) {
    return option.initValue.value;
  }
  return option.initValue;
};

export const checkAndSetInitValue = (option: OptionsFormType, value: any) => {
  const { typeComponent, viewDateType } = option;
  if (typeComponent === "date" && typeof value === "string") {
    if (viewDateType === "year") {
      return formatYearToDate(value);
    }
    return formatDateToString({ date: value });
  }
  return value;
};

export const initFromData = (options: OptionsFormType[],
  initValueForm: Record<string, any> | undefined,
  setFormValue: React.Dispatch<React.SetStateAction<Record<string, any> | undefined>>) => {
  const form: any = {};
  for (const option of options) {
    form[option.field] = (initValueForm && initValueForm?.[option.field])
      ? checkAndSetInitValue(option, initValueForm[option.field])
      : option?.initValue ? getInitValue(option) : null;
  }
  setFormValue(form);
};

export const getOptionApp: any = (option: OptionsFormType, config: TypeConfig) => {
  const { typeSelect, typeSelectAsync } = option;
  if (typeSelect) {
    return dataConfigLocal[typeSelect];
  }
  if (typeSelectAsync) {
    return config[typeSelectAsync];
  }
  return option.optionSelect;
};
