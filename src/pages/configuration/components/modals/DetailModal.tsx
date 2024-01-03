import { useRef } from "react";
import * as yup from "yup";
import { openNotification } from "../../../../component/alert/Alert";
import AppInput from "../../../../component/appInput/AppInput";
import AppModal from "../../../../component/appModal/AppModal";
import { IFormRef, OptionsFormType } from "../../../../model/components/FormCommonModel";
import { EditParamModal } from "../../../../model/apParamsManagementModel/ApParamsManagementModel";
import { fetchDetailConfig, fetchEditConfig } from "../../ConfigurationsServices";
import { ModalType, ResponseCode } from "../../../../enum/commom";
import FormCommon from "../../../../component/form/formCommon/FormCommon";
import { isDisabledEdit } from "../../../paramsManagement/ApParamsManagementServices";
import AppSelect from "../../../../component/appSelect/AppSelect";

const DetailModal = (props: EditParamModal<any>) => {
  const { data, editModal, refetch, type } = props;

  const formRef = useRef<IFormRef>();
  const options: OptionsFormType[] = [
    {
      component: AppInput,
      field: "gr",
      label: "Nhóm",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "name",
      label: "Tên",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "code",
      label: "Mã",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "value",
      label: "Giá trị",
    },

    {
      component: AppInput,
      field: "description",
      label: "Mô tả",
    },

    {
      component: AppInput,
      field: "reason",
      label: "Lý do",
    },

    {
      component: AppSelect,
      field: "applicationName",
      label: "Ứng dụng",
      typeSelectAsync: "applicationName",
      mode: "multiple",
    },
  ];

  const formSchema = yup.object({
    code: yup.string().required("Code không được để trống").nullable(),
    name: yup.string().required("Name không được để trống").nullable(),
    gr: yup.string().required("Gr không được để trống").nullable(),
    value: yup.string().required("Value không được để trống").nullable(),
    reason: yup.string().required("Lý do không được để trống").nullable(),
    applicationName: yup.array().required("Application Name không được để trống").nullable(),
  });

  const getTitle = () => {
    switch (type) {
      case ModalType.CREATE:
        return "Tạo mới";
      case ModalType.EDIT:
        return "Chỉnh sửa";
      case ModalType.VIEW:
        return "Chi tiết";
    }
  };

  const handleSubmit = async (value: any) => {
    let res;
    const data = { ...value, applicationName: value.applicationName.join(",") };

    type === ModalType.CREATE
      ? res = await fetchDetailConfig(data)
      : res = await fetchEditConfig(data);

    if (res.code === ResponseCode.SUCCESS) {
      editModal.current?.setOpenModal(false);
      openNotification({ description: "Cập nhật thành công" });
      formRef.current?.reset();
      refetch();
    }
  };

  return (
      <AppModal
        ref={editModal}
        title={getTitle()}
        onCancel={() => {
          formRef.current?.reset();
        }}
        isFormItem
        width={1000}
        content={
          <FormCommon
            formItem
            ref={formRef}
            values={data}
            schema={formSchema}
            noBorder
            isShowSubmit={type !== ModalType.VIEW}
            isShowBtnClose={true}
            labelBtnSubmit={type === ModalType.CREATE ? "Tạo" : "Sửa"}
            typeIconBtnSubmit={type === ModalType.CREATE ? "create" : "edit"}
            options={options}
            buttonAlight='center'
            layoutCommon={{ xxl: 12, xl: 12, md: 12, lg: 12, sm: 12, xs: 24 }}
            onHandleSubmit={handleSubmit}
            onClose={() => {
              editModal.current?.setOpenModal(false);
            }}
         />
        }
      />
  );
};

export default DetailModal;
