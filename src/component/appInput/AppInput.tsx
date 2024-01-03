import { Input } from "antd";
import { AppInputStyle } from "./appInputStyle";
import { AppInputModel } from "../../model/components/AppInputModel";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "../commonStyle/CommonStyle";
import useHeight from "../hook/useHeight";
import { KeyboardEvent } from "react";

export default function AppInput(props: AppInputModel) {
  const {
    title,
    name,
    onChangeInput,
    maxLength,
    type,
    max,
    titleWidth,
    value,
    onChange,
    formItem,
    required,
    errorMessage,
    ...rest
  } = props;

  const heightAppInput = useHeight("app-input-id");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    const isSideNumberKey = (keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57); // Allow only side number keys
    const isValidKey = isSideNumberKey || keyCode === 8 || keyCode === 46 || (event.ctrlKey && (event.key === "c" || event.key === "v" || event.key === "x")); // Allow side number keys, backspace, and delete

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  return (
    <AppInputStyle>
      {
        title && (
          <AppTitle className="input-title" width={titleWidth} height={heightAppInput}>
            <span>{title}</span>
            {required && <RequiredComponent> *</RequiredComponent>}
          </AppTitle>
        )
      }
      <AppWapperInput>
        <Input
          {...rest}
          id="app-input-id"
          name={name}
          maxLength={maxLength}
          type={type}
          max={max}
          value={value}
          onChange={(e) => {
            onChange && onChange(e);
            onChangeInput && onChangeInput(e.target.value);
          }}
          onKeyDown={type === "tel" ? handleKeyDown : undefined}
        />
        {
          status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>
        }
      </AppWapperInput>
    </AppInputStyle>
  );
}
