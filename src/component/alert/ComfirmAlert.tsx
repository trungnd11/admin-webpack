import { CSSProperties } from "react";
import { Modal, Space } from "antd";
import { CloseOutlined, CheckOutlined, CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Color } from "../variable";
import { TypeConfirm } from "../../enum/commom";

const okButtonStyle: CSSProperties = {
  borderColor: Color.green,
  color: Color.green
};

export const ConfirmAlert = (props: {
  title?: string
  content?: string
  handleOk: () => void
  handleCancel?: () => void
  hanleClose?: () => void
  typeConfirm?: "warning" | "success"
  hideBtnCancal?: boolean
}) => {
  const {
    title,
    content,
    handleOk,
    typeConfirm,
    hideBtnCancal,
    handleCancel,
    hanleClose
  } = props;
  return (
    <>
      {
        Modal.confirm({
          title: title ?? "Xác nhận",
          content,
          icon: typeConfirm === TypeConfirm.SUCCESS ? <CheckCircleOutlined /> : <WarningOutlined />,
          okText: (
            <Space>
              <CheckOutlined />
              <span>Đồng ý</span>
            </Space>
          ),
          cancelText: (
            <Space>
              <CloseOutlined />
              <span>Hủy</span>
            </Space>
          ),
          centered: true,
          onOk: handleOk,
          onCancel: handleCancel,
          afterClose: hanleClose,
          cancelButtonProps: {
            danger: true,
            className: `${hideBtnCancal && "cancel-btn-hide"}`
          },
          okButtonProps: {
            type: "default",
            style: okButtonStyle
          },
          className: "modal-comfirm-custom"
        })
      }
    </>
  );
};
