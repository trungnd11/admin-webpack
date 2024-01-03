import { useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { RefModal } from "../../model/components/AppModalModel";
import { useQuery } from "react-query";
import { fetchConfigList, fetchDeleteConfig, formSchema, initValueConfiguration } from "./ConfigurationsServices";
import { rowNumber } from "../../helper/functionCommon";
import { ActionButtonStyle, ModalDeleteStyle } from "../paramsManagement/apParamsManagementStyle";
import { OptionsFormType } from "../../model/components/FormCommonModel";
import AppInput from "../../component/appInput/AppInput";
import AppModal from "../../component/appModal/AppModal";
import { openNotification } from "../../component/alert/Alert";
import DetailModal from "./components/modals/DetailModal";
import ConfigurationApi from "../../api/configurations/ConfigurationApi";
import { ModalType } from "../../enum/commom";
import { ConfigurationModel, ConfigurationSearchParams } from "../../model/configurationModel/ConfigurationModel";
import FormCommon from "../../component/form/formCommon/FormCommon";
import AppActionButton from "../../component/appActionButton/AppActionButton";
import { cutString } from "../../ulti/stringUlti";
import AppSelect from "../../component/appSelect/AppSelect";
import AppTable from "container/AppTable";

const Configuration = () => {
  const [search, setSearch] = useState<ConfigurationSearchParams>({
    page: 0,
    size: 10,
    gr: "",
    name: "",
    code: "",
    status: "",
    value: "",
    applicationName: ""
  });
  const deleteModal = useRef<RefModal>();
  const detailModal = useRef<RefModal>();
  const [deleteRequest, setDeleteRequest] = useState<any>({
    idConfig: undefined,
    reason: ""
  });
  const [typeModal, setTypeModal] = useState<string>(ModalType.CREATE);
  const [dataDetail, setDataDetail] = useState<ConfigurationModel>(initValueConfiguration);

  const { data: configuation, refetch: reloadDataConfiguration, isFetching: loading } = useQuery(["get-params-list", search],
    () => fetchConfigList(search));

  const handleActionUpdate = async (record: ConfigurationModel) => {
    const { data } = await ConfigurationApi.getDetailConfig({ idConfig: record.autoId });
    setDataDetail(data.data);
    setTypeModal(ModalType.EDIT);
    detailModal.current?.setOpenModal(true);
  };

  const handleActionDelete = (record: ConfigurationModel) => {
    deleteModal.current?.setOpenModal(true);
    setDeleteRequest({ idConfig: +record.autoId, reason: "" });
  };

  const confirmActionDelete = async () => {
    if (deleteRequest?.reason?.length) {
      try {
        await fetchDeleteConfig(deleteRequest);
        openNotification({ description: "Xoá thành công", type: "success" });
        reloadDataConfiguration();
        deleteModal.current?.setOpenModal(false);
      } catch (error) {
      }
    } else {
      openNotification({ description: "Vui lý nhập lý do", type: "error" });
    }
  };

  const columns: ColumnsType<ConfigurationModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 50,
      align: "center",
      render: (_value, _record, index) => {
        return rowNumber(index, search?.page ?? 0, search?.size ?? 10);
      }
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
          handleClick={type => type === "update" ? handleActionUpdate(record) : type === "delete" && handleActionDelete(record)}
        />
      )
    },

    {
      title: "Nhóm",
      dataIndex: "gr",
    },

    {
      title: "Mã",
      dataIndex: "code",
    },

    {
      title: "Tên",
      dataIndex: "name",
    },

    {
      title: "Giá trị",
      dataIndex: "value",
      align: "left",
      render: value => cutString(value)
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

  const options: OptionsFormType[] = [
    {
      component: AppInput,
      field: "gr",
      label: "Nhóm",
      maxLength: 50,
    },

    {
      component: AppInput,
      field: "name",
      label: "Tên",
      maxLength: 50,
    },

    {
      component: AppInput,
      field: "code",
      label: "Mã",
      maxLength: 50,
    },

    {
      component: AppSelect,
      field: "applicationName",
      label: "Ứng dụng",
      typeSelectAsync: "applicationName"
    },
  ];

  const onSubmit = (data: any) => {
    const formattedData: any = { ...data, page: 0, size: 10 };

    setSearch(formattedData);
  };

  return (
    <>
      <FormCommon
        formItem
        options={options}
        isShowBtnCreate
        isShowSubmit
        schema={formSchema}
        labelBtnSubmit="Tìm kiếm"
        typeIconBtnSubmit="search"
        layoutCommon={{ xs: 24, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }}
        onCreate={() => {
          setDataDetail(initValueConfiguration);
          setTypeModal(ModalType.CREATE);
          detailModal.current?.setOpenModal(true);
        }}
        onHandleSubmit={(form) => onSubmit(form)}
      >
        <AppTable
          loading={loading}
          columns={columns}
          dataSource={configuation?.data}
          pageOption={{
            size: search?.size ?? 10,
            current: search?.page + 1 ?? 0,
            total: configuation?.totalElements,
          }}
          onPage={({ page, size }) => {
            setSearch({
              ...search,
              page: page ?? search?.page,
              size: size ?? search?.size,
            });
          }}
          scroll={{ y: 400 }}
        />
      </FormCommon>

      <AppModal
        ref={deleteModal}
        title={"Xác nhận xóa"}
        onOk={confirmActionDelete}
        onCancel={() => setDeleteRequest({ idConfig: undefined, reason: "" })}
        content={
          <ModalDeleteStyle>
            <ActionButtonStyle>
              Bạn có chắc chắn muốn xóa config này?
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
        refetch={reloadDataConfiguration}
      />
    </>
  );
};

export default Configuration;
