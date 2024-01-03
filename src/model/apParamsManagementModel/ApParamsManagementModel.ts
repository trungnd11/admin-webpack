import { PageSizeModel } from "../PageSizeModel";
export interface ApParamsModel {
  description: string
  id: string
  parGroup: string
  parName: string
  parType: string
  parValue: string
  isModify?: string
};

export interface GetParamsRequestModel extends PageSizeModel {
  parGroup: string
  parType: string
  parName: string
  applicationName: string
};

export interface EditParamModal<T> {
  editModal: any
  refetch: any
  type: string
  data: T
};
