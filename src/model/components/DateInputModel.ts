import type { Dayjs } from "dayjs";

export interface IDateInputPropsModel {
  defaultValue?: string | Dayjs
  onChange?: (date: Dayjs | null, dateString: string) => void
  disabled?: boolean
}
