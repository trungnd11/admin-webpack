import { PageSizeModel } from "../PageSizeModel";

export interface SearchHistoryAction extends PageSizeModel {
  action?: string
  field?: string
  targetObjectCode?: string
  fromDate?: string
  toDate?: string
}

export interface HistoryActionList {
  action: string
  targetObjectCode: string
  createdAt: string
  createdBy: string
  reason: string
  module: string
  field: string
  oldValue: string
  newValue: string
}
