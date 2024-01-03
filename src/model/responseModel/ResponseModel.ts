import { TypeResponse } from "../../enum/commom";

export interface ResponseListModel<T> {
  object?: TypeResponse.LIST
  totalCount?: number
  pageSize?: number
  pageIndex?: number
  data?: T[]
  loading?: boolean
};

export interface ResponseDataModel<T> {
  message: string
  code: string
  data: T
  totalElements?: number
}

export interface ResponsePageModel<T> {
  data: T
}
