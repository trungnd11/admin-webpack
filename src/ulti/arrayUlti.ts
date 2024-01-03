/* eslint-disable no-eval */

export const filterArray = (props: {
  arr: any[]
  field?: string
  condition: string
  operator?: "<" | "<=" | "===" | "!==" | ">=" | ">"
}) => {
  const { arr, condition, field, operator } = props;
  return field
    ? arr.filter(item => eval(`${item[field]} ${operator ?? "==="} ${condition}`))
    : arr.filter(item => eval(`${item} ${operator ?? "==="} ${condition}`));
};

export const isArray = (data: unknown) => Array.isArray(data);

export const isEmptyArray = (inputArray: any[] | any) => {
  return !inputArray ? true : (Array.isArray(inputArray) && inputArray.length === 0);
};

export const isEmptyArrayRole = (inputArray: any[] | any) => {
  return (Array.isArray(inputArray) && inputArray.length === 0);
};

export const findValue = (props: { arr: any[], field: string, fieldValue: string, returnField: string }) => {
  const { arr, field, fieldValue, returnField } = props;
  return arr.find((item: any) => item[field] === fieldValue)?.[returnField] || fieldValue;
};
