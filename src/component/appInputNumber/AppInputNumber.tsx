import type {
  NumericFormatProps,
  NumberFormatValues,
} from "react-number-format";
import { Input } from "antd";
import { NumericFormat } from "react-number-format";
import _ from "lodash";

interface CustomProps
  extends Omit<
  NumericFormatProps,
  "customInput" | "onValueChange" | "onChange"
  > {
  fieldValue?: "formattedValue" | "value" | "floatValue"
  customInput?: any
  onChange?: (value: string | number | NumberFormatValues) => void
}
const AppInputNumber = ({ onChange, fieldValue, ...props }: CustomProps) => {
  const onValueChange = (values: NumberFormatValues) => {
    if (onChange) {
      const value = fieldValue ? values[fieldValue] : values;
      onChange(value ?? "");
    }
  };

  return <NumericFormat onValueChange={onValueChange} {...props} />;
};

export default AppInputNumber;

AppInputNumber.defaultProps = {
  decimalSeparator: ".",
  thousandSeparator: ",",
  fieldValue: "value",
  customInput: Input,
  onChange: (value: string | number | undefined | null) => console.log(value),
};

export const exceptionChar =
  (chars: string[] = []) =>
    (values: NumberFormatValues) => {
      const value = _.toString(values.value);

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (value.includes(char)) {
          return false;
        }
      }

      return true;
    };
