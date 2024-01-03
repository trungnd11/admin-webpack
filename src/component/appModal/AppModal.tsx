import { useState, forwardRef, useImperativeHandle } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AppModalModel } from "../../model/components/AppModalModel";
import { AppModalStyle } from "./appModalStyle";
import AppButton from "../appButton/AppButton";

function AppModal(props: AppModalModel, ref: any) {
  const {
    content,
    title,
    isDetail,
    isFormItem,
    handleSubmit,
    onOk,
    onCancel,
    isShowBtnCancel,
    okButtonProps,
    ...rest
  } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal,
      setOpenModal
    }),
    [open]
  );

  const FooterDetail = (
    <AppButton
      className="btn-cancel"
      name="Đóng"
      type="default"
      onClick={() => setOpenModal(false)}
    />
  );

  return (
  <AppModalStyle
    {...rest}
    footer={isDetail ? FooterDetail : isFormItem && null}
    centered={rest.centered ?? true}
    title={title ?? "Modal"}
    okText={rest.okText ?? "Đồng ý"}
    cancelText={rest.cancelText ?? "Hủy"}
    cancelButtonProps={{ className: "btn-cancel", icon: <CloseOutlined /> }}
    okButtonProps={{ className: "btn-confirm", icon: <CheckOutlined />, ...okButtonProps }}
    open={openModal}
    onOk={onOk}
    onCancel={() => {
      onCancel && onCancel();
      setOpenModal(false);
    }}
  >
    {content}
  </AppModalStyle>
  );
};

export default forwardRef(AppModal);
