import { useRef, useState } from "react";
import * as yup from "yup";
import { openNotification } from "../../../../component/alert/Alert";
import AppInput from "../../../../component/appInput/AppInput";
import AppModal from "../../../../component/appModal/AppModal";
import { IFormRef, OptionsFormType } from "../../../../model/components/FormCommonModel";
import { EditParamModal } from "../../../../model/apParamsManagementModel/ApParamsManagementModel";
import { ModalType, ResponseCode } from "../../../../enum/commom";
import FormCommon from "../../../../component/form/formCommon/FormCommon";
import { fetchCreatePage, fetchEditPage } from "../../PageEntityServices";
import { Drawer } from "antd";
import AppTextEditor from "../../../../component/textEditor/AppTextEditor";
import { PageEntityModel } from "../../../../model/PageEntityModel/PageEntityModel";
import { TypeFormManagerPageEnum } from "../../../../enum/pages/PageEntityEnum";
import AppViewHtml from "../../../../component/appViewHtml/AppViewHtml";
interface OpenEditContentType {
  open: boolean
  content: string
  type: TypeFormManagerPageEnum
}

const DetailModal = (props: EditParamModal<PageEntityModel>) => {
  const { data, editModal, refetch, type } = props;
  const [openEditContent, setOpenEditContent] = useState<OpenEditContentType>({ open: false, content: "", type: TypeFormManagerPageEnum.EDIT });

  const formRef = useRef<IFormRef>();
  const options: OptionsFormType[] = [
    {
      component: AppInput,
      field: "title",
      label: "Title",
      disabled: type === ModalType.EDIT,
    },

    {
      component: AppInput,
      field: "brief",
      label: "Brief",
      disabled: type === ModalType.EDIT,
    },

    {
      component: AppInput,
      field: "code",
      label: "Code",
      disabled: type === ModalType.EDIT,
    },
    {
      component: AppInput,
      field: "cataId",
      label: "CataId",
      disabled: type === ModalType.EDIT,
    },
    {
      component: AppInput,
      field: "reason",
      label: "Reason",
    },
    {
      component: AppViewHtml,
      field: "content",
      label: "Content",
    }
  ];

  const formSchema = yup.object({
    brief: yup.string().required("Brief không được để trống").nullable(),
    code: yup.string().required("Code không được để trống").nullable(),
    title: yup.string().required("Title không được để trống").nullable(),
    cataId: yup.string().required("CataId không được để trống").nullable(),
    reason: yup.string().required("CataId không được để trống").nullable(),
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
    if (openEditContent.type === TypeFormManagerPageEnum.EDIT) {
      setOpenEditContent(pre => ({ ...pre, open: true }));
      return;
    }
    const reqBody = { ...value, content: openEditContent.content };
    let res;
    type === ModalType.CREATE
      ? res = await fetchCreatePage(reqBody)
      : res = await fetchEditPage(reqBody);

    if (res.code === ResponseCode.SUCCESS) {
      editModal.current?.setOpenModal(false);
      openNotification({ description: "Cập nhật thành công", type: "success" });
      formRef.current?.reset();
      setOpenEditContent({ open: false, content: "", type: TypeFormManagerPageEnum.EDIT });
      refetch();
    }
  };

  const handleCloseContent = () => {
    setOpenEditContent(pre => ({ ...pre, open: false, content: "" }));
  };

  const handleSubmitContent = (bodyContent: string) => {
    setOpenEditContent({ open: false, content: bodyContent, type: TypeFormManagerPageEnum.SUBMIT });
  };

  return (
    <>
      <AppModal
        ref={editModal}
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
            labelBtnSubmit={type === ModalType.CREATE ? "Tạo mới" : "Chỉnh sửa"}
            typeIconBtnSubmit={type === ModalType.CREATE ? "create" : "edit"}
            options={options}
            buttonAlight='center'
            layoutCommon={{ xs: 24 }}
            onHandleSubmit={handleSubmit}
            onClose={() => {
              editModal.current?.setOpenModal(false);
              setOpenEditContent({ open: false, content: "", type: TypeFormManagerPageEnum.EDIT });
            }}
          />
        }
      />
      <Drawer
        width="100%"
        open={openEditContent.open}
        onClose={handleCloseContent}
      >
        <AppTextEditor
          content={data.content}
          showBtnSubmit
          onHandleSubmit={handleSubmitContent}
        />
      </Drawer>
    </>
  );
};

export default DetailModal;
