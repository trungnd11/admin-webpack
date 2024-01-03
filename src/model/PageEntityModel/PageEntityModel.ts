import { PageSizeModel } from "../PageSizeModel";

export interface PageEntityModel {
  autoId: string
  title: string
  brief: string
  ord: string
  createdBy: string
  createdAt: string
  status: string
  modifiedAt: string
  modifiedBy: string
  code: string
  cataId: string
  content: string
}

export interface SearchPageEntityModel extends PageSizeModel {
  title?: string
  brief?: string
};
