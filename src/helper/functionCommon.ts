import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";
import type { RangePickerProps } from "antd/es/date-picker";
import { SiteMapTitleModel } from "../model/SiteMapModel";

export const isEmptyObject = (inputObject: Record<string, unknown>) => {
  return Object.keys(inputObject).length === 0;
};

export const setTitle = (value: string) => {
  document.title = value;
};

export const numberWithDot = (number: number | string, type?: "dot" | "comma") => {
  if (number === "") return "";
  if (!number) return null;

  const [integerPart, decimalPart = ""] = (number.toString().split("."));
  const strippedDecimalPart = decimalPart.replace(/0+$/, "");

  return strippedDecimalPart
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, type === "dot" ? "." : ",") + "." + strippedDecimalPart
    : integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, type === "dot" ? "." : ",");
};

export const formatMoney = (number: any) => {
  return _.toString(number).replace(",", "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const removeSpace = (str: string) => str.replace(/\s/g, "");

export const scrollBottom = () => window.scrollTo(0, 10000);

export const isReturnsPromise = (func?: (() => Promise<void>) | (() => void)) => {
  return func ? func() instanceof Promise : false;
};

export function flattenTreeArray(treeArray: any) {
  return treeArray.reduce((flatArray: any, item: any) => {
    if (item.children) {
      return flatArray.concat(item, flattenTreeArray(item.children));
    } else {
      return flatArray.concat(item);
    }
  }, []);
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFullNameByIdOrder(id: string, accountList: any) {
  return accountList.filter((item: any) => item.id === id).map((item: any) => item.fullAccountName);
}

export function flattenObject(obj: any, parentKey = "") {
  let flattenedObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        const nestedObj = flattenObject(obj[key], newKey);
        flattenedObj = { ...flattenedObj, ...nestedObj };
      } else {
        flattenedObj[newKey] = obj[key];
      }
    }
  }

  return flattenedObj;
}

export const rowNumber = (currentRow: number, pageIndex: number, pageSize: number) => {
  return (pageIndex * pageSize) + (currentRow + 1);
};

export const formatStringToDate = (props: {
  date: string
  format?: "DD/MM/YYYY" | "YYYY/MM/DD" | "DD-MM-YYYY"
  milliseconds?: boolean
}) =>
  props.milliseconds && props.date
    ? dayjs(props.date)
    : props.date
      ? dayjs(props.date, props.format ?? "DD-MM-YYYY")
      : undefined;

export const formatDateToString = (props: {
  date: Date | string | any
  format?: "DD/MM/YYYY" | "YYYY/MM/DD" | "DD-MM-YYYY"
}) =>
  props.date ? dayjs(props.date).format(props.format ?? "DD-MM-YYYY") : null;

export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current > dayjs().endOf("day");
};

export const getHeightTable = (sm: number, lg: number) => {
  const isLaptop = window.innerWidth <= 1440 && window.innerHeight <= 768;

  if (isLaptop) {
    return sm;
  }

  return lg;
};

export const removeVietnameseDiacritics = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};

export const isWithinNumberDays = (fromDate: Dayjs, toDate: Dayjs, rangeDate: number) => {
  const fromDateObj = dayjs(fromDate, "DD/MM/YYYY");
  const toDateObj = dayjs(toDate, "DD/MM/YYYY");
  const isWithin31Days = toDateObj.diff(fromDateObj, "day") < rangeDate;

  return isWithin31Days;
};

export const getTitlePage = (pathName: string, siteMap: SiteMapTitleModel[]) => {
  const titlePage = siteMap.find(item => item.path === pathName);
  return titlePage?.name ?? "";
};
