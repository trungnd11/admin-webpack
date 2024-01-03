import { ChangeEvent, useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import localeDate from "antd/es/date-picker/locale/vi_VN";
import { DatePickerStyle } from "./appDatePickerStyle";
import { AppDatePickerModel } from "../../model/components/AppDatePickerModel";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "../commonStyle/CommonStyle";
import { formatDateToString, formatStringToDate } from "../../ulti/dateUlti";
import useHeight from "../hook/useHeight";

export default function AppDatePicker(props: AppDatePickerModel) {
  const {
    name,
    placeholder,
    title,
    picker,
    onChange,
    defaultValue,
    format = "DD/MM/YYYY",
    required,
    disabledDate,
    onKeyPress,
    status,
    value,
    validateText,
    titleWidth,
    errorMessage,
    ...rest
  } = props;
  const arr: any[] = [];
  const [valueInput, setValueInput] = useState<any>(defaultValue ?? value ?? "");
  const heightAppDate = useHeight("app-datepicker-id");

  useEffect(() => {
    value && dayjs(value).isValid() ? setValueInput(() => value) : setValueInput(null);
  }, [value]);

  const checkIsValidDate = (stringDate: string) => {
    const date = formatStringToDate({ date: stringDate, format: "DD/MM/YYYY" });
    if (date?.isValid) {
      onKeyPress && onKeyPress(formatDateToString({ date, format: "DD/MM/YYYY" }));
      return;
    }
    onKeyPress && onKeyPress(formatDateToString({ date: dayjs(), format: "DD/MM/YYYY" }));
  };

  const handleDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const onBlurDate = (e: ChangeEvent<HTMLInputElement>) => {
    const valueDate = e.target.value;

    if (!valueDate) {
      onKeyPress && onKeyPress(null);
      setValueInput(null);
    };

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
        checkIsValidDate(stringDate);
      }
    }
    if ((arr.length === 10 && arr.includes("-")) || (arr.length === 10 && arr.includes("/"))) {
      const stringDate = arr.join("");
      if (stringDate.length === 10) {
        checkIsValidDate(stringDate);
      }
    } else if (arr.length === 8) {
      const stringDate = arr.map((item, index) => index === 1 || index === 3 ? `${item}/` : item).join("");
      if (stringDate.length === 10) {
        checkIsValidDate(stringDate);
      }
    }
  };

  return (
    <DatePickerStyle>
      {
        title && (
          <AppTitle width={titleWidth} height={heightAppDate && heightAppDate + 8}>
            <span>{title}</span>
            {required && <RequiredComponent> *</RequiredComponent>}
          </AppTitle>
        )
      }

      <AppWapperInput>
        <DatePicker
          {...rest}
          id="app-datepicker-id"
          name={name}
          locale={localeDate}
          onChange={(date, dateString) => {
            onChange && onChange(date, dateString);
            setValueInput(() => dateString);
          }}
          defaultValue={defaultValue}
          placeholder={placeholder ?? "Chọn ngày"}
          picker={picker ?? "date"}
          format={format}
          disabledDate={disabledDate}
          onBlur={onBlurDate}
          onKeyDown={(e) => onKeyPress && handleDate(e)}
          onFocus={() => arr.splice(0, arr.length)}
          value={formatStringToDate({ date: valueInput, format: "DD/MM/YYYY" })}
          status={status ?? ""}
        />
        {validateText && <div className="validate">{validateText}</div>}
        {
          status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>
        }
      </AppWapperInput>
    </DatePickerStyle>
  );
}
