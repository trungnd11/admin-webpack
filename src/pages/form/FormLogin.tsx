import { useMemo } from "react";
import { Col, Row } from "antd";
import FormInput from "../../component/form/formInput/FormInput";
import withHandleForm from "../../component/form/hoc/withHandleForm";
import { Control, FieldValues, FormState } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import Lazy from "yup/lib/Lazy";
import { schema } from "./dataValidate";
import AppInput from "../../component/appInput/AppInput";
import AppDatePicker from "../../component/appDatePicker/AppDatePicker";
import AppSelect from "../../component/appSelect/AppSelect";

function FormLogin(props: {
  control?: Control<FieldValues, any>
  formState?: FormState<FieldValues>
  schema?: AnyObjectSchema | Lazy<any, unknown>
}) {
  const { control, formState, schema } = props;

  const formInputProp = useMemo(() => ({
    control,
    formState,
    schema
  }), [formState, control]);

  return (
    <Row justify="center" gutter={[32, 10]}>
      <Col span={24}>
        <FormInput
          name="username"
          label="Tên đăng nhập"
          TypeComponent={AppInput}
          {...formInputProp}
        />
      </Col>
      <Col span={24}>
        <FormInput
          name="password"
          label="Mật khẩu"
          typeSelectAsync="applicationName"
          TypeComponent={AppSelect}
          {...formInputProp}
        />
      </Col>
      <Col span={24}>
        <FormInput
          name="formDate"
          label="Từ ngày"
          typeSelectAsync="tableList"
          TypeComponent={AppDatePicker}
          {...formInputProp}
        />
      </Col>
    </Row>
  );
}

export default withHandleForm(FormLogin, schema);
