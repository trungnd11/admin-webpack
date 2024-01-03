import { useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import AppModal from "../../component/appModal/AppModal";
import DetailModal from "./components/modals/DetailModal";
import ParamsManagementApi from "../../api/apParamsManagement/apParamsManagementApi";
import FormSearchCommon from "../../component/form/formCommon/FormCommon";
import { fetchDeleteParam, fetchParamsList, formSchema, initApParamDetail, options } from "./ApParamsManagementServices";
import { ApParamsModel, GetParamsRequestModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";
import { ActionButtonStyle, ModalDeleteStyle } from "./apParamsManagementStyle";
import { rowNumber } from "../../helper/functionCommon";
import { RefModal } from "../../model/components/AppModalModel";
import { openNotification } from "../../component/alert/Alert";
import { ModalType } from "../../enum/commom";
import AppActionButton from "../../component/appActionButton/AppActionButton";
import AppInput from "../../component/appInput/AppInput";
import AppTable from "container/AppTable";

export default function ParamsManagement() {
  const [search, setSearch] = useState<GetParamsRequestModel>({
    page: 0,
    size: 10,
    parGroup: "",
    parType: "",
    parName: "",
    applicationName: ""
  });
  const deleteModal = useRef<RefModal>();
  const detailModal = useRef<RefModal>();
  const [deleteRequest, setDeleteRequest] = useState<any>({
    idApParam: undefined,
    reason: ""
  });
  const [typeModal, setTypeModal] = useState<string>(ModalType.CREATE);
  const [dataDetail, setDataDetail] = useState<ApParamsModel>(initApParamDetail);

  const { data: listApParam, refetch, isFetching: loading } = useQuery(["get-params-list", search],
    () => fetchParamsList(search));

  const handleActionUpdate = async (record: ApParamsModel) => {
    const { data: { data } } = await ParamsManagementApi.getDetailParams({ idApParam: +record.id });
    setDataDetail(data);
    setTypeModal(ModalType.EDIT);
    detailModal.current?.setOpenModal(true);
  };

  const handleActionDelete = async (record: ApParamsModel) => {
    deleteModal.current?.setOpenModal(true);
    setDeleteRequest({ idApParam: +record.id, reason: "" });
  };

  const confirmActionDelete = async () => {
    if (deleteRequest?.reason?.length) {
      try {
        await fetchDeleteParam(deleteRequest);
        deleteModal.current?.setOpenModal(false);
        openNotification({ description: "Xoá thành công", type: "success" });
        refetch();
      } catch (error) {
      }
    } else {
      openNotification({
        description: "Vui lý nhập lý do",
        type: "error",
      });
    }
  };

  const columns: ColumnsType<ApParamsModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 50,
      align: "center",
      render: (_value, _record, index) => rowNumber(index, search?.page ?? 0, search?.size ?? 10)
    },
    {
      title: "Hành động",
      dataIndex: "bankId",
      align: "center",
      width: 120,
      render: (_value, record) => (
        <AppActionButton
          title={{ update: "Sửa", delete: "Xóa" }}
          disabled={!Number(record.isModify)}
          handleClick={(type) => type === "update"
            ? handleActionUpdate(record)
            : type === "delete" && handleActionDelete(record)}
        />
      )
    },

    {
      title: "Nhóm tham số",
      dataIndex: "parGroup",
      align: "center",
    },

    {
      title: "Tên tham số",
      dataIndex: "parName",
      align: "center",
    },

    {
      title: "Loại tham số",
      dataIndex: "parType",
      align: "center",
    },

    {
      title: "Giá trị tham số",
      dataIndex: "parValue",
      align: "center",
    },

    {
      title: "Mô tả",
      dataIndex: "description",
    },

    {
      title: "Ứng dụng",
      dataIndex: "applicationName",
      align: "center",
    },
  ];

  const onSubmit = (data: any) => {
    const formattedData: any = { ...data, page: 0, size: 10 };
    setSearch(formattedData);
  };

  return (
    <>
      <FormSearchCommon
        formItem
        options={options}
        isShowBtnCreate
        isShowSubmit
        schema={formSchema}
        labelBtnSubmit="Tìm kiếm"
        typeIconBtnSubmit="search"
        layoutCommon={{ xl: 7, lg: 12, md: 12, sm: 24, xs: 24 }}
        onCreate={() => {
          setDataDetail(initApParamDetail);
          setTypeModal(ModalType.CREATE);
          detailModal.current?.setOpenModal(true);
        }}
        onHandleSubmit={(form) => onSubmit(form)}
      >
        <AppTable
          loading={loading}
          columns={columns}
          dataSource={listApParam?.data}
          pageOption={{
            size: search?.size ?? 10,
            current: search?.page + 1 ?? 0,
            total: listApParam?.totalElements,
          }}
          scroll={{ y: 400 }}
          onPage={({ page, size }) => {
            setSearch({
              ...search,
              page: page ?? search?.page,
              size: size ?? search?.size,
            });
          }}
        />
      </FormSearchCommon>

      <AppModal
        ref={deleteModal}
        title={"Xác nhận xóa"}
        onOk={confirmActionDelete}
        onCancel={() => setDeleteRequest({ idApParam: undefined, reason: "" })}
        okText="Xoá"
        cancelText="Hủy"
        content={
          <ModalDeleteStyle>
            <ActionButtonStyle>
              Bạn có chắc chắn muốn xóa param này?
            </ActionButtonStyle>
            <AppInput
              title="Lý do"
              required
              max={200}
              value={deleteRequest?.reason}
              onChange={(e) => setDeleteRequest({ ...deleteRequest, reason: e.target.value })}
            />
          </ModalDeleteStyle>
        }
      />

      <DetailModal
        type={typeModal}
        editModal={detailModal}
        data={dataDetail}
        refetch={refetch}
      />
    </>
  );
}
