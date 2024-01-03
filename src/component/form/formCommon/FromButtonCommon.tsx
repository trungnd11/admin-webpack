import { Space } from "antd";
import { FormState, UseFormReset } from "react-hook-form";
import AppButton from "../../appButton/AppButton";
import { AlignComponent } from "../../commonStyle/CommonStyle";
import { FormCommonModel } from "../../../model/components/FormCommonModel";
import usePrivileges from "../../hook/usePrivileges";
import { NotPermissionMessageEnum } from "../../../enum/RoleEnum";

interface FromButtonCommonProps<T> extends FormCommonModel<T> {
  handleSearch?: () => void
  formState?: FormState<any>
  reset?: UseFormReset<any>
  loading?: boolean
};

export default function FromButtonCommon<T>(props: FromButtonCommonProps<T>) {
  const {
    handleSearch,
    formItem,
    formState,
    reset,
    isShowBtnExport,
    isShowBtnPayBatch,
    loadingBtnSearch,
    onExport,
    onPayBatch,
    disableBtnExport,
    disableBtnPayBatch,
    labelBtnSubmit,
    typeIconBtnSubmit,
    isShowBtnCreate,
    labelBtnCreate,
    onCreate,
    disableBtnCreate,
    isShowBtnClose,
    onClose,
    isShowBtnSearch,
    isShowSubmit = true,
    isDisableSubmit = false,
    buttonAlight = "end",
    loading
  } = props;
  const { create, exports } = usePrivileges();

  const ButtonBodySearch = (
    <AlignComponent notMargin align="end" alignHeight="end">
      <Space>
        {
          isShowBtnPayBatch && (
            <AppButton
              name="Thanh toán theo kỳ"
              disabled={disableBtnPayBatch}
              onClick={onPayBatch}
            />
          )
        }

        {isShowBtnSearch &&
          <AppButton
            name="Tìm kiếm"
            typeIcon="search"
            loading={loadingBtnSearch}
            onClick={handleSearch}
          />
        }

        {
          isShowBtnCreate && (
            <AppButton
              name={labelBtnCreate ?? "Tạo mới"}
              typeIcon="create"
              disabled={disableBtnCreate ?? !create}
              loading={loadingBtnSearch}
              onClick={onCreate}
              title={create ? "" : NotPermissionMessageEnum.CREATE}
            />
          )
        }

        {
          isShowBtnExport && (
            <AppButton
              name="Xuất excel"
              typeIcon="excel"
              disabled={disableBtnExport}
              loading={loadingBtnSearch}
              onClick={onExport}
              title={exports ? "" : NotPermissionMessageEnum.EXPORTS}
            />
          )
        }
      </Space>
    </AlignComponent>
  );

  const ButtonFormItem = (
    <AlignComponent notMargin align={buttonAlight} alignHeight="end">
      <Space>
        {
          isShowBtnPayBatch && (
            <AppButton
              name="Thanh toán theo kỳ"
              disabled={disableBtnPayBatch}
              onClick={onPayBatch}
            />
          )
        }

        {
          isShowBtnClose && (
            <AppButton
              name="Đóng"
              style={{ background: "rgb(134, 139, 136)" }}
              typeIcon="close"
              onClick={() => {
                reset && reset();
                onClose && onClose();
              }}
            />
          )
        }

        {isShowSubmit && (
          <AppButton
            name={labelBtnSubmit ?? "Submit"}
            htmlType="submit"
            typeIcon={typeIconBtnSubmit ?? "create"}
            disabled={!formState?.isValid || isDisableSubmit}
            loading={loadingBtnSearch ?? loading}
          />
        )
        }

        {
          isShowBtnExport && (
            <AppButton
              name="Xuất excel"
              typeIcon="excel"
              disabled={disableBtnExport ?? !formState?.isValid}
              loading={loadingBtnSearch}
              onClick={onExport}
              title={exports ? "" : NotPermissionMessageEnum.EXPORTS}
            />
          )
        }

        {
          isShowBtnCreate && (
            <AppButton
              name={labelBtnCreate ?? "Tạo mới"}
              typeIcon='create'
              disabled={disableBtnCreate ?? !create}
              loading={loadingBtnSearch}
              onClick={onCreate}
              title={create ? "" : NotPermissionMessageEnum.CREATE}
            />
          )
        }
      </Space>
    </AlignComponent>
  );

  return (
    <>
      { formItem ? ButtonFormItem : ButtonBodySearch }
    </>
  );
}
