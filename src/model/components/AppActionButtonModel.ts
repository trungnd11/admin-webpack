type ActionButtonType = "update" | "delete";

export interface TitleActionButtonType {
  update?: string
  delete?: string
}

export interface AppActionButtonModel {
  handleClick: (type: ActionButtonType) => void
  title?: TitleActionButtonType
  disabled?: boolean
};
