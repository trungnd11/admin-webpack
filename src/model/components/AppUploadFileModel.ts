export interface IUploadFile {
  title?: string
  fileList?: any[]
  onChange?: (info: any) => void
  onChangeInput?: (value: any) => void
}
