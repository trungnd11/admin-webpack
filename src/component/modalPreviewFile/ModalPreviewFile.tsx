import { Modal } from "antd";
import type { ModalProps } from "antd";
import ModalPreviewFileStyle from "./ModalPreviewFileStyle";

interface CustomProps extends ModalProps {
  blob: string
  name?: string
}

const ModalPreviewFile = (props: CustomProps) => {
  const onSaveFile = () => {
    const a = document.createElement("a");
    a.href = props.blob;
    a.download = props.name ?? "Filedownload";
    a.click();
  };

  return (
    <Modal
      style={{ top: 5 }}
      width={"100vw"}
      open={true}
      okText={"Tải file"}
      onOk={onSaveFile}
      cancelText={"Đóng"}
      cancelButtonProps={{ className: "close-modal" }}
      {...props}
    >
      <ModalPreviewFileStyle>
        <embed src={props.blob} />
      </ModalPreviewFileStyle>
    </Modal>
  );
};

export default ModalPreviewFile;
