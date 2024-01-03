import { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { IDateInputPropsModel } from "../../model/components/DateInputModel";

const DateInput = (props: IDateInputPropsModel) => {
  const {
    defaultValue,
    onChange,
    disabled = false
  } = props;
  const dateFormat = "DD/MM/YYYY";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
      <>
         <DatePicker
            onChange={onChange}
            defaultValue={defaultValue ? dayjs(defaultValue, dateFormat) : undefined}
            format={isOpen ? "DDMMYYYY" : dateFormat}
            onOpenChange={status => {
              setIsOpen(status);
            }}
            disabled={disabled}
         />
      </>
  );
};

export default DateInput;
