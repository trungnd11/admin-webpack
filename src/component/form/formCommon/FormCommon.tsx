import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Col, Collapse, Form, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormBodyItemStyle, FormSearchCommontStyle, HeaderSearch } from "./formCommonStyle";
import { SearchOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store/reduxHook";
import { formatDateToString, isDate } from "../../../ulti/dateUlti";
import FormInput from "../formInput/FormInput";
import { FormCommonModel, OptionsFormType, RequiredListType } from "../../../model/components/FormCommonModel";
import { getConfigStore } from "../../../store/configSelect/configSelect";
import AppCard from "../../appCard/AppCard";
import AppCheckbox from "../../appCheckbox/AppCheckbox";
import { getInitLayout, getOptionApp, initFromData } from "./FromCommonServices";
import FromButtonCommon from "./FromButtonCommon";

const { Panel } = Collapse;

function FormCommon<T>(props: FormCommonModel<T>, ref: any) {
  const {
    options,
    gutter,
    children,
    titleSearch,
    titleResult,
    layoutCommon,
    initValueForm,
    onSearch,
    layoutWrapperButton,
    onChange,
    formItem,
    schema,
    onHandleSubmit,
    resetField,
    noBorder,
    values,
    layout = "horizontal",
    isCreatePolicy = false,
  } = props;
  const { config } = useAppSelector(getConfigStore);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<Record<string, any> | undefined>();
  const [requiredList, setRequiredList] = useState<RequiredListType[]>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const { control, formState, handleSubmit, reset, trigger, setValue } = useForm({
    mode: "all",
    resolver: schema ? yupResolver(schema) : undefined,
    values,
    defaultValues: initValueForm,
  });

  useImperativeHandle(
    ref, () => ({
      reset,
      setValue,
      setFormValue
    }));

  const getRequiredComponent = () => {
    const listRequired: RequiredListType[] = [];
    for (const item of options) {
      if (item?.required) {
        listRequired.push(
          {
            field: item.field,
            errorMessage: `${item.label} không được để trống`,
            required: initValueForm ? !initValueForm[item.field] : true
          });
      }
    };
    setRequiredList(listRequired);
  };

  const checkErrorField = (item: OptionsFormType) =>
    requiredList?.find(required => required.field === item.field)?.required;

  const handleChange = (field: string, value: string) => {
    const fieldRequired = requiredList?.find(item => item.field === field);
    if (fieldRequired && !isSearch && !value) {
      setRequiredList(pre => pre?.map(item => {
        if (item.field === fieldRequired.field) {
          return {
            ...fieldRequired, required: true
          };
        }
        return { ...item };
      }));
      setIsSearch(true);
    }
    if (fieldRequired && value) {
      setRequiredList(pre => pre?.map(item => {
        if (item.field === fieldRequired.field) {
          return {
            ...fieldRequired, required: false
          };
        }
        return { ...item };
      }));
      setIsSearch(false);
    }
    onChange && onChange({ field, value, setValue });

    setFormValue(pre => ({ ...pre, [field]: value }));
  };

  const handleSearch = () => {
    const form: any = {};
    for (const field in formValue) {
      const fieldRequired = requiredList?.find(item => item.field === field);
      if (fieldRequired?.required && !formValue[field]) {
        setRequiredList(pre => pre?.map(item => {
          if (item.field === fieldRequired.field) {
            return {
              ...fieldRequired, required: true
            };
          }
          return { ...item };
        }));
        setIsSearch(true);
        return;
      }
      setIsSearch(false);
      if (isDate(formValue[field])) {
        const option = options.find(item => item.field === field);
        if (option) {
          if (option.viewDateType === "year") {
            form[field] = formValue[field].year().toString();
          } else {
            form[field] = formatDateToString({ date: formValue[field] });
          }
        }
      } else {
        form[field] = formValue[field];
      }
    };
    onSearch && onSearch(form);
  };

  const onSubmit = (formValue: FieldValues) => {
    const form: any = {};
    for (const field in formValue) {
      if (isDate(formValue[field])) {
        const option = options.find(item => item.field === field);
        if (option) {
          if (option.viewDateType === "year") {
            form[field] = formValue[field].year().toString();
          } else {
            form[field] = formatDateToString({ date: formValue[field] });
          }
        }
      } else {
        form[field] = formValue[field];
      }
    };
    const confirmFunction = onHandleSubmit instanceof Function ? onHandleSubmit(form) : undefined;
    if (confirmFunction instanceof Promise) {
      setIsLoadingSubmit(true);
      confirmFunction.then(() => {
        setIsLoadingSubmit(false);
      }).catch(_err => {
        setIsLoadingSubmit(false);
      });
    }
    // onHandleSubmit && onHandleSubmit(form);
  };

  const FormBodySearch = (
    <Row gutter={gutter ?? [32, 10]}>
      {
        options?.map((item, index) => {
          return (
            <Col key={index}
              {...(layoutCommon ? { ...layoutCommon } : { ...getInitLayout(item) })}
            >
              <item.component
                title={item.label}
                onBlurInput={(value: string) => handleChange(item.field, value)}
                onChange={(value: any, _option: any) => handleChange(item.field, value)}
                placeholder={`${item.typeSelect ?? item.typeSelectAsync ? "Chọn" : ""} ${item.typeSelect ?? item.typeSelectAsync ? item.label?.toLocaleLowerCase() : item.label}`}
                picker={"year"}
                options={getOptionApp(item, config)}
                defaultValue={formValue?.[item.field]}
                allowClear={item?.allowClearSelect ?? false}
                status={isSearch && checkErrorField(item) ? "error" : ""}
                errorMessage={requiredList?.find(required => required.field === item.field)?.errorMessage}
                required={item.required}
              />
            </Col>
          );
        })
      }
      <Col {...(layoutWrapperButton ? { ...layoutWrapperButton } : { span: 24 })}>
        <FromButtonCommon { ...props } handleSearch={handleSearch} />
      </Col>
    </Row>
  );

  const FormBodyItem = (
      <Form
        onFinish={handleSubmit(onSubmit)}
        ref={ref}
        layout={layout}
      >
        <Row gutter={[32, 10]}>
          {
            options.map((item, index) => {
              return item.hidden
                ? null
                : <Col key={index} {...(layoutCommon ? { ...layoutCommon } : { ...getInitLayout(item) })}>
                  {item.invisible
                    ? null
                    : <FormInput
                      className={item.component === AppCheckbox ? "checkbox" : ""}
                      {...item}
                      name={item.field}
                      label={item.label}
                      TypeComponent={item.component}
                      control={control}
                      formState={formState}
                      schema={schema}
                      trigger={trigger}
                      dependentField={item.dependentField}
                      onChange={(value) => handleChange(item.field, value)}
                      content={values?.content}
                    />
                  }

                </Col>;
            })
          }
          <Col
            className={`${isCreatePolicy ? "action-container" : ""}`}
            {...(layoutWrapperButton ? { ...layoutWrapperButton } : { span: 24 })}
          >
            <FromButtonCommon {...props} formState={formState} reset={reset} loading={isLoadingSubmit} />
          </Col>
        </Row>
      </Form>
  );

  useEffect(() => {
    initFromData(options, initValueForm, setFormValue);
    getRequiredComponent();
  }, []);

  useEffect(() => {
    reset();
  }, [resetField]);

  useEffect(() => {
    values ? setFormValue(values) : setFormValue(initValueForm);
  }, [values]);

  return noBorder
    ? <FormBodyItemStyle className={layout === "vertical" ? "vertical-form" : ""}>
        { FormBodyItem }
      </FormBodyItemStyle>
    : <FormSearchCommontStyle>
      <Collapse
        defaultActiveKey={[`1`]}
        expandIconPosition="end"
      >
        <Panel header={titleSearch ??
          <HeaderSearch>
            <SearchOutlined /><span className="title-search">{titleSearch ?? "Tìm kiếm"}</span>
          </HeaderSearch>}
          key={1}
        >
          {
            formItem && schema
              ? (
                  FormBodyItem
                )
              : (
                  FormBodySearch
                )
          }
        </Panel>
      </Collapse>
      {
        children && (
          <Row>
            <Col span={24}>
              <AppCard
                title={titleResult ?? "Kết quả tìm kiếm"}
                contents={children}
              />
            </Col>
          </Row>
        )
      }
    </FormSearchCommontStyle>
  ;
}

export default forwardRef(FormCommon);
