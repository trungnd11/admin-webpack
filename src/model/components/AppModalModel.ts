import { ModalFuncProps } from "antd";

export interface AppModalModel extends ModalFuncProps {
  content?: React.ReactNode
  isDetail?: boolean
  isFormItem?: boolean
  handleSubmit?: any
  isShowBtnCancel?: boolean
};

export interface RefModal {
  openModal: boolean
  setOpenModal: (open: boolean) => void
};
