import { ReactNode, useMemo } from "react";
import { Form, FormItemProps } from "antd";
import { Controller } from "react-hook-form";
import DynamicComponent from "../../dynamicComponent/DynamicComponent";
import { FormInputStyle } from "./formInputStyle";
import { TypeConfig } from "../../../model/configDataModel/ConfigDataModel";
import { TypeSelectApp } from "../../../model/components/AppSelectModel";
import { formatDateToString, formatStringToDate } from "../../../helper/functionCommon";
import AppDatePicker from "../../appDatePicker/AppDatePicker";
import { isDate } from "../../../ulti/dateUlti";
import AppCheckbox from "../../appCheckbox/AppCheckbox";

interface PropsFormInput extends FormItemProps {
  name: string
  label?: string | ReactNode
  formState?: any
  control?: any
  typeInput?: "input" | "select" | "date-picker" | "checkbox" | "radio"
  TypeComponent?: JSX.Element | any
  typeSelect?: keyof TypeSelectApp
  typeSelectAsync?: keyof TypeConfig
  schema: any
  children?: ReactNode
  trigger?: any
  dependentField?: string[]
  onChange?: (value: any) => void
  content?: string
  disabled?: boolean
}

export default function FormInput({
  name,
  label,
  formState: { errors },
  control,
  typeInput,
  schema,
  TypeComponent,
  labelCol,
  wrapperCol,
  trigger,
  dependentField,
  onChange,
  content,
  ...rest
}: PropsFormInput) {
  const ItemComponent = useMemo(() => DynamicComponent(typeInput ?? "input"), [typeInput]);

  const handleOnChange = (value: any) => {
    if (value?.target) {
      onChange && onChange(value.target.value);
    } else {
      onChange && onChange(value);
    }
  };
  const component = <TypeComponent />;

  return (
    <FormInputStyle
      className={component?.type === AppCheckbox ? "checkbox" : ""}
    >
      <Form.Item
        {...rest}
        label={label}
        labelAlign="left"
        colon={false}
        validateStatus={errors?.[name] ? "error" : "success"}
        help={errors?.[name] ? errors[name].message : null}
        required={!!schema?.fields[name]?.exclusiveTests?.required}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              TypeComponent
                ? <TypeComponent
                  {...rest}
                  {...field}
                  disabled={rest?.disabled}
                  status={errors?.[name] ? "error" : ""}
                  {...(content ? { content } : {})}
                  onChange={(value: any) => {
                    if (isDate(value)) {
                      field.onChange(formatStringToDate({ date: value }));
                      dependentField && trigger(dependentField);
                      handleOnChange(formatDateToString({ date: value }));
                      return;
                    }
                    handleOnChange(value);
                    field.onChange(value);
                    dependentField && trigger(dependentField);
                  }}
                  {...(component?.type === AppDatePicker
                    ? {
                        onKeyPress: (stringDate: string) => {
                          stringDate ? field.onChange(formatStringToDate({ date: stringDate })) : field.onChange(null);
                          dependentField && trigger(dependentField);
                        }
                      }
                    : {})}
                />
                : <ItemComponent
                  {...field} status={errors?.[name] ? "error" : ""}
                />
            );
          }}
        />
      </Form.Item>
    </FormInputStyle>
  );
};
