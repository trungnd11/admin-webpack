import { Select } from "antd";

export interface ISelectInputModel {
  data?: any
  placeholder?: string
}

export const SelectInput = (props: ISelectInputModel) => {
  const { data, placeholder } = props;
  return (
      <Select placeholder={placeholder}>
         { data && data.length && data.map((item: any,) => (
            <Select.Option key={item.id} value={item.fullAccountName}>
               {item.fullAccountName}
            </Select.Option>
         ))}
      </Select>
  );
};
