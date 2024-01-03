import { LoadingModel } from "../LoadingModel";
import { PageSizeModel } from "../PageSizeModel";
export interface ReloadCacheTableModel {
  project?: string
};
export interface ReloadCacheSearchParams extends PageSizeModel, LoadingModel {
  parGroup: string
  parName: string
  parType: string
  parValue: string
};
