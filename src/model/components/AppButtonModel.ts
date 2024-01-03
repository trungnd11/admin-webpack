import { ButtonProps } from "antd";

export type IconButtonType =
"search" |
"excel" |
"create" |
"update" |
"delete" |
"file" |
"close" |
"check" |
"pause" |
"stop" |
"detail" |
"continue" |
"edit" |
"send" |
"assign";

export interface AppButtonModel extends ButtonProps {
  name?: string
  typeIcon?: IconButtonType
  title?: string
};

export interface AppGroupButtonModel extends ButtonProps {
  options: any
  record?: any
  onDelete?: () => void
  onSend?: () => void
  onPause?: () => void
  onStop?: () => void
  onEdit?: () => void
  onContinue?: () => void
  onAssign?: () => void
  onApprove?: () => void
  onReject?: () => void
  onDetail?: () => void
};
