import { FC } from "react";
import { Form } from "antd";
import { Control, FieldValues, FormState, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import AppButton from "../../appButton/AppButton";
import { FooterModalComponent } from "../../commonStyle/CommonStyle";
import { isDate } from "../../../ulti/dateUlti";
import { formatDateToString } from "../../../helper/functionCommon";

export interface Props extends FieldValues {
  control?: Control<FieldValues, any>
  formState?: FormState<FieldValues>
  onHandleSubmit?: (data: FieldValues) => void
  schema?: ObjectSchema<any, any>
  onCancel?: () => void
}

export default function withHandleForm(Component: FC<Props>, schemaObj: ObjectSchema<any, any>, confirmText?: string) {
  const HandleComponent: FC<Props> = (props, _ref) => {
    const { onHandleSubmit, onCancel } = props;
    const { control, formState, handleSubmit, reset } = useForm({
      resolver: yupResolver(schemaObj),
    });

    const handleCancel = () => {
      reset();
      onCancel && onCancel();
    };

    const onSubmit = (formValue: FieldValues) => {
      const form: any = {};
      for (const field in formValue) {
        if (isDate(formValue[field])) {
          form[field] = formatDateToString({ date: formValue[field] });
        } else {
          form[field] = formValue[field];
        }
      };
      onHandleSubmit && onHandleSubmit(form);
    };

    return (
      <Form
        onFinish={handleSubmit(onSubmit)}
      >
        <Component
          control={control}
          formState={formState}
          schema={schemaObj}
        />
        <FooterModalComponent>
          <AppButton
            danger
            name="Đóng"
            type="default"
            typeIcon="close"
            onClick={handleCancel}
          />
          <AppButton
            htmlType="submit"
            typeIcon="check"
            name={confirmText ?? "Đồng ý"}
          />
        </FooterModalComponent>
      </Form>
    );
  };
  return HandleComponent;
}
