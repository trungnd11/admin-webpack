import { PageSizeModel } from "../PageSizeModel";

export interface ConfigurationSearchParams extends PageSizeModel {
  gr: string
  name: string
  code: string
  status: string
  value: string
  applicationName: string

};

export interface ConfigurationModel {
  autoId: string
  description: string
  gr: string
  name: string
  code: string
  status: string
  value: string
  isModify?: string
};
