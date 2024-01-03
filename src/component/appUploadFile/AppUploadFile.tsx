import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { IUploadFile } from "../../model/components/AppUploadFileModel";

export default function AppUploadFile(props: IUploadFile) {
  const {
    title,
    fileList,
    onChange,
    onChangeInput,
  } = props;

  const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{title ?? "Tải lên"}</div>
      </div>
  );

  return (
     <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={(e) => {
        onChange && onChange(e);
        onChangeInput && onChangeInput(e);
      }}
     >
        {fileList?.length ? fileList : uploadButton}
     </Upload>
  );
}
