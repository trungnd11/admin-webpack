import type { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";

export interface ColumnsExtends<T> extends ColumnsType<T> {
  isSort?: boolean
}

export interface PageOptionType {
  size: number
  current?: number
  total?: number
}
export interface PageOptionModel {
  page?: number
  size?: number
}
export interface AppTableModel<T> extends TableProps<T> {
  rowTypeSelection?: "checkbox" | "radio"
  columns: ColumnsExtends<T>
  pageOption?: PageOptionType
  hidePage?: boolean
  ref?: any
  onChangeFilter?: (filter: Record<string, FilterValue | null>) => void
  onPage?: (pageOption: PageOptionModel) => void
  onClickRow?: (record: T, index?: number) => void
};
