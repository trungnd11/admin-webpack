import { useRef } from "react";
import * as yup from "yup";
import { openNotification } from "../../../../component/alert/Alert";
import AppInput from "../../../../component/appInput/AppInput";
import AppModal from "../../../../component/appModal/AppModal";
import { IFormRef, OptionsFormType } from "../../../../model/components/FormCommonModel";
import { EditParamModal } from "../../../../model/apParamsManagementModel/ApParamsManagementModel";
import { fetchCreateParam, fetchEditParam, isDisabledEdit } from "../../ApParamsManagementServices";
import { ModalType, ResponseCode } from "../../../../enum/commom";
import FormCommon from "../../../../component/form/formCommon/FormCommon";
import AppSelect from "../../../../component/appSelect/AppSelect";

const DetailModal = (props: EditParamModal<any>) => {
  const {
    data,
    editModal,
    refetch,
    type
  } = props;

  const formRef = useRef<IFormRef>();
  const options: OptionsFormType[] = [
    {
      component: AppInput,
      field: "parGroup",
      label: "Nhóm tham số",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "parType",
      label: "Loại tham số",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "parName",
      label: "Tên tham số",
      disabled: isDisabledEdit(type)
    },

    {
      component: AppInput,
      field: "parValue",
      label: "Giá trị tham số",
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
    parGroup: yup.string().required("parGroup không được để trống").nullable(),
    parType: yup.string().required("parType không được để trống").nullable(),
    parName: yup.string().required("parName không được để trống").nullable(),
    parValue: yup.string().required("parValue không được để trống").nullable(),
    reason: yup.string().required("lý do không được để trống").nullable(),
    applicationName: yup.array().required("application name không được để trống").nullable(),
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
      ? res = await fetchCreateParam(data)
      : res = await fetchEditParam(data);

    if (res.code === ResponseCode.SUCCESS) {
      editModal.current?.setOpenModal(false);
      openNotification({
        description: "Cập nhật thành công",
        type: "success",
      });
      formRef.current?.reset();
      refetch();
    }
  };

  return (
      <AppModal
        ref={editModal}
        width={1000}
        title={getTitle()}
        onCancel={() => {
          formRef.current?.reset();
        }}
        isFormItem
        content={
          <FormCommon
            formItem
            ref={formRef}
            values={data}
            noBorder
            schema={formSchema}
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
