import { startTransition, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TextEditorStyle } from "./textEditorStyle";
import { AppTextEditorModel } from "../../model/components/AppTextEditorModel";
import { handleImageUpload, pluginsConfig, toolBarConfig } from "./AppTextEditorServices";
import AppButton from "../appButton/AppButton";
import { AlignComponent } from "../commonStyle/CommonStyle";

export default function AppTextEditor(props: AppTextEditorModel) {
  const { content, onChangeGetContent, showBtnSubmit, btnSubmitName, onHandleSubmit, ...rest } = props;
  const [contents, setContents] = useState<string | undefined>(content);

  const handleChangeContent = (bodyContent: string) => {
    console.log({ bodyContent });
    startTransition(() => {
      setContents(bodyContent);
    });
    onChangeGetContent && onChangeGetContent(bodyContent);
  };

  const handleSubmit = () => {
    contents && onHandleSubmit && onHandleSubmit(contents);
  };

  return (
    <TextEditorStyle>
      <Editor
        {...rest}
        apiKey="2xsp1iw9mea7k5r04sqqd910ib2481qx9gdmgkudhojaw2xu"
        initialValue={content ?? `<p>Đang tải...</p>`}
        init={{
          height: "100%",
          menubar: false,
          plugins: pluginsConfig,
          toolbar: toolBarConfig,
          toolbar_mode: "sliding",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "file image media",
          file_browser_callback_types: "image",
          images_upload_handler: handleImageUpload,
        }}
        onChange={(e) => handleChangeContent(e.target.getContent())}
      />
      {
        showBtnSubmit && (
          <AlignComponent className="wapper-btn-submit-texteditor" align="end">
            <AppButton
              typeIcon="send"
              name={btnSubmitName ?? "Xác nhận"}
              onClick={handleSubmit}
            />
          </AlignComponent>
        )
      }
    </TextEditorStyle>
  );
}
