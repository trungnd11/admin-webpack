import { IAllProps } from "@tinymce/tinymce-react";

export interface AppTextEditorModel extends IAllProps {
  content?: string
  height?: number
  onChangeGetContent?: (content: string) => void
  onHandleSubmit?: (content: string) => void
  showBtnSubmit?: boolean
  btnSubmitName?: string
};

export type UploadHandler = (blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>;

type ProgressFn = (percent: number) => void;

export interface BlobInfo {
  id: () => string
  name: () => string
  filename: () => string
  blob: () => Blob
  base64: () => string
  blobUri: () => string
  uri: () => string | undefined
};
