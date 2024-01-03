import { useRef, useState } from "react";
import { useQuery } from "react-query";
import * as yup from "yup";
import FormSearchCommon from "../../component/form/formCommon/FormCommon";
import { PageEntityModel, SearchPageEntityModel } from "../../model/PageEntityModel/PageEntityModel";
import { ModalType } from "../../enum/commom";
import { ColumnsType } from "antd/es/table";
import { rowNumber } from "../../helper/functionCommon";
import { ActionButtonStyle } from "../paramsManagement/apParamsManagementStyle";
import { fetchDeletePage, fetchListPage, options, pageEntityEmptyData } from "./PageEntityServices";
import DetailModal from "./components/modals/DetailModal";
import { RefModal } from "../../model/components/AppModalModel";
import AppModal from "../../component/appModal/AppModal";
import { openNotification } from "../../component/alert/Alert";
import AppActionButton from "../../component/appActionButton/AppActionButton";
import { cutString } from "../../ulti/stringUlti";
import AppTable from "container/AppTable";

const formSchema = yup.object({
  title: yup.string().nullable(),
  brief: yup.string().nullable(),
});

const PageEntity = () => {
  const [search, setSearch] = useState<SearchPageEntityModel>({
    page: 0,
    size: 10,
    title: "",
    brief: ""
  });

  const detailModal = useRef<RefModal>();
  const deleteModal = useRef<RefModal>();
  const [id, setId] = useState<number>();
  const [typeModal, setTypeModal] = useState<string>(ModalType.CREATE);
  const [dataDetail, setDataDetail] = useState<PageEntityModel>(pageEntityEmptyData);

  const { data: listPage, refetch, isFetching: loading } = useQuery(["get-page-list", search],
    () => fetchListPage(search));

  const handleActionUpdate = (record: PageEntityModel) => {
    setDataDetail(record);
    setTypeModal(ModalType.EDIT);
    detailModal.current?.setOpenModal(true);
  };

  const handleActionDelete = (record: PageEntityModel) => {
    deleteModal.current?.setOpenModal(true);
    setId(+record.autoId);
  };

  const confirmActionDelete = async () => {
    try {
      await fetchDeletePage({ id });
      deleteModal.current?.setOpenModal(false);
      openNotification({ description: "Xoá thành công", type: "success" });
      refetch();
    } catch (error) {
    }
  };

  const columns: ColumnsType<PageEntityModel> = [
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
          handleClick={type => type === "update"
            ? handleActionUpdate(record)
            : type === "delete" && handleActionDelete(record)}
        />
      )
    },

    {
      title: "Tiêu đề",
      dataIndex: "title",
    },

    {
      title: "Mô tả",
      dataIndex: "brief",
    },

    {
      title: "Thứ tự",
      dataIndex: "ord",
      align: "center",
    },

    {
      title: "Mã",
      dataIndex: "code",
      align: "center",
    },

    {
      title: "Nội dung",
      dataIndex: "content",
      width: "20%",
      render: value => cutString(value)
    },

    {
      title: "Người tạo",
      dataIndex: "createdBy",
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },

    {
      title: "Người sửa",
      dataIndex: "modifiedBy",
    },

    {
      title: "Ngày sửa",
      dataIndex: "modifiedAt",
    }
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
        onCreate={() => {
          setDataDetail(pageEntityEmptyData);
          setTypeModal(ModalType.CREATE);
          detailModal.current?.setOpenModal(true);
        }}
        onHandleSubmit={(form) => onSubmit(form)}
      >
        <AppTable
          loading={loading}
          columns={columns}
          dataSource={listPage?.data}
          pageOption={{
            size: search?.size ?? 10,
            current: search?.page + 1 ?? 0,
            total: listPage?.totalElements,
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
        content={
          <>
            <ActionButtonStyle>
              Bạn có chắc chắn muốn xóa page này?
            </ActionButtonStyle>
          </>
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
};

export default PageEntity;
