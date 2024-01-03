import { Select } from "antd";
import { AppSelectStyle } from "./appSelectStyle";
import { useAppSelector } from "../../store/reduxHook";
import { getConfigStore } from "../../store/configSelect/configSelect";
import { AppSelectModel } from "../../model/components/AppSelectModel";
import { AppTitle, AppWapperInput, ErrorMessage, RequiredComponent } from "../commonStyle/CommonStyle";
import { removeVietnameseDiacritics } from "../../helper/functionCommon";
import useHeight from "../hook/useHeight";
import { isArray } from "lodash";

export default function AppSelect(props: AppSelectModel) {
  const {
    disabled,
    placeholder,
    title,
    options,
    onChange,
    defaultValue,
    typeSelectAsync,
    allowClear,
    required = false,
    showSearch,
    addAll = false,
    titleWidth,
    errorMessage,
    status,
    mode,
    filterOptions,
    combineField,
    ...rest
  } = props;
  const { config } = useAppSelector(getConfigStore);
  const heightAppSelect = useHeight("app-select-id");

  const getOptionApp: any = () => {
    if (typeSelectAsync) {
      if (combineField?.length) {
        const data = config[typeSelectAsync].map((item) => {
          return {
            ...item,
            label: item.code === "NAPAS" ? item.name : combineField.map((f, index) => ` ${index !== combineField.length - 1 ? "" : "-"} ${item[f]}`)
          };
        });

        return data;
      }
      return config[typeSelectAsync];
    }
    return options;
  };

  const addSelectAll = () => {
    if (typeSelectAsync) {
      const data = config[typeSelectAsync];
      if (filterOptions) {
        return [{ value: "", label: "Tất cả" }].concat(data.filter((item) => {
          return isArray(item.cateId) ? item.cateId.includes(filterOptions) : +item.cateId === +filterOptions;
        }));
      }
      return [{ value: "", label: "Tất cả" }].concat(data);
    }
  };

  return (
    <AppSelectStyle>
      {
        title && (
          <AppTitle width={titleWidth} height={heightAppSelect}>
            <span>{title}</span>
            {required && <RequiredComponent> *</RequiredComponent>}
          </AppTitle>
        )
      }
      <AppWapperInput>
        <Select
          {...rest}
          id="app-select-id"
          style={{ width: "100%" }}
          showSearch={showSearch ?? true}
          allowClear={allowClear ?? false}
          disabled={disabled}
          options={addAll ? addSelectAll() : getOptionApp()}
          placeholder={placeholder ?? "Chọn"}
          onChange={(value, option) => {
            onChange && onChange(value, option);
          }}
          defaultValue={defaultValue}
          filterOption={(input, option) => {
            return removeVietnameseDiacritics(option?.label?.toString().toLowerCase() ?? "")
              .includes(removeVietnameseDiacritics(input.toLowerCase())) ?? false;
          }
          }
          status={status ?? ""}
          mode={mode}
          maxTagCount='responsive'
        />
        {
          status && <ErrorMessage>{errorMessage ?? ""}</ErrorMessage>
        }
      </AppWapperInput>
    </AppSelectStyle>
  );
}
