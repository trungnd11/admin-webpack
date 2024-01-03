import { BlobInfo, UploadHandler } from "../../model/components/AppTextEditorModel";

export const pluginsConfig = [
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "table",
  "code",
  "help",
  "wordcount",
];

export const toolBarConfig = "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | align lineheight | checklist numlist bullist indent outdent";

export const handleImageUpload: UploadHandler = async (blobInfo: BlobInfo) => {
  return await new Promise((resolve, _reject) => {
    const stringBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`;
    resolve(stringBase64);
  });
};
