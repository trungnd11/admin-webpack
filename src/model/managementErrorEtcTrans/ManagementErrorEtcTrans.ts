import { PageSizeModel } from "../PageSizeModel";

export interface SearchErrorEtcTransModel extends PageSizeModel {
  action?: string
  channel?: string
  fromDate?: string
  toDate?: string
};

export interface ErrorEtcTransModel {
  autoId: string
  action: string
  state: string
  messageData: string
  channel: string
  createdAt: string
  createdBy: string
}
