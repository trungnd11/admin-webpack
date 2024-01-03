import { ChangeEvent } from "react";
import dayjs from "dayjs";
import { formatStringToDate, formatDateToString } from "../../helper/functionCommon";

export const checkIsValidDate = (stringDate: string, onKeyPress?: Function) => {
  const date = formatStringToDate({ date: stringDate, format: "DD/MM/YYYY" });
  if (date?.isValid) {
    onKeyPress && onKeyPress(formatDateToString({ date, format: "DD/MM/YYYY" }));
    return;
  }
  onKeyPress && onKeyPress(formatDateToString({ date: dayjs(), format: "DD/MM/YYYY" }));
};

export const handleDate = (e: React.KeyboardEvent<HTMLInputElement>, arr: any[]) => {
  if (!/[0-9/-]/.test(e.key) && !e.key.includes("Backspace") &&
    !e.key.includes("Tab") && !e.key.includes("Enter") &&
    !e.key.includes("Control") && !e.key.includes("c") &&
    !e.key.includes("ArrowLeft") && !e.key.includes("ArrowRight") && !e.key.includes("v")) {
    e.preventDefault();
  } else {
    if (e.key.includes("Backspace")) {
      arr.splice(arr.length - 1, 1);
    }
    const value: any = e.key;
    if (/[0-9/-]/.test(value) && arr.length < 10) {
      arr.push(value);
      const stringDate = arr.join("");
      stringDate.length === 10 && checkIsValidDate(stringDate);
    } else {
      /[0-9]/.test(value) && arr.length < 8 && arr.push(value);
      const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
      stringDate.length === 10 && checkIsValidDate(stringDate);
    }
  }
};

export const onBlurDate = (e: ChangeEvent<HTMLInputElement>, arr: any[], action: any, onKeyPress?: Function) => {
  const valueDate = e.target.value;

  if (!valueDate) return action(null);

  if ((valueDate.includes("/") && valueDate.length === 10) || (valueDate.includes("-") && valueDate.length === 10)) {
    const date = formatStringToDate({ date: valueDate, format: "DD/MM/YYYY" });
    if (date?.isValid) {
      onKeyPress && onKeyPress(formatDateToString({ date, format: "DD/MM/YYYY" }));
    }
  }
  if (valueDate.length === 8) {
    const arrDate = [];
    for (const number of valueDate) {
      arrDate.push(number);
    }
    const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
    if (stringDate.length === 10) {
      checkIsValidDate(stringDate, onKeyPress);
    }
  }
  if ((arr.length === 10 && arr.includes("-")) || (arr.length === 10 && arr.includes("/"))) {
    const stringDate = arr.join("");
    if (stringDate.length === 10) {
      checkIsValidDate(stringDate, onKeyPress);
    }
  } else if (arr.length === 8) {
    const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
    if (stringDate.length === 10) {
      checkIsValidDate(stringDate, onKeyPress);
    }
  }
};
