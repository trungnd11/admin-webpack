import AppTable from "../../component/appTable/AppTable";
import FormSearchCommon from "../../component/form/formCommon/FormCommon";
import * as yup from "yup";
import { OptionsFormType } from "../../model/components/FormCommonModel";
import AppInput from "../../component/appInput/AppInput";
import { useState } from "react";
import { ErrorEtcTransModel, SearchErrorEtcTransModel } from "../../model/managementErrorEtcTrans/ManagementErrorEtcTrans";
import { rowNumber } from "../../helper/functionCommon";
import { ColumnsType } from "antd/es/table";
import { fetchListPage } from "./ManagementErrorEtcTransServices";
import { useQuery } from "react-query";
import ReloadAction from "../../component/action/reload/ReloadAction";
import AppDatePicker from "../../component/appDatePicker/AppDatePicker";
import { formatDateToString, getBeforeDateByCurrentDate, getToDay } from "../../ulti/dateUlti";
import ManagementErrorEtcTransApi from "../../api/managementErrorEtcTrans/ManagementErrorEtcTransApi";
import { openNotification } from "../../component/alert/Alert";
import { ResponseCode } from "../../enum/commom";

export default function ManagementErrorEtcTrans() {
  const [search, setSearch] = useState<SearchErrorEtcTransModel>({
    page: 0,
    size: 10,
    channel: "",
    action: "",
    fromDate: formatDateToString({ date: getBeforeDateByCurrentDate({ number: 7 }) }),
    toDate: formatDateToString({ date: getToDay() }),
  });

  const formSchema = yup.object({
    title: yup.string().nullable(),
    brief: yup.string().nullable(),
  });

  const { data: listPage, isFetching: loading } = useQuery(["get-error-list", search],
    () => fetchListPage(search));

  const options: OptionsFormType[] = [
    {
      component: AppInput,
      field: "channel",
      label: "Kênh",
      maxLength: 50,
    },

    {
      component: AppInput,
      field: "action",
      label: "Hành động",
      maxLength: 50,
    },

    {
      component: AppDatePicker,
      field: "fromDate",
      label: "Từ ngày",
    },

    {
      component: AppDatePicker,
      field: "toDate",
      label: "Đến ngày",
    },
  ];

  const columns: ColumnsType<ErrorEtcTransModel> = [
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
      title: "Kênh",
      dataIndex: "channel",
      align: "center",
    },

    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
    },

    {
      title: "Trạng thái",
      dataIndex: "state",
      align: "center",
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
    },

    {
      title: "Người tạo",
      dataIndex: "createdBy",
    },

    {
      title: "Retry giao dịch",
      dataIndex: "index",
      align: "center",
      render: (_value, record) => {
        return <ReloadAction onClick={() => handleReload(record.autoId)}/>;
      },
    },
  ];

  const handleReload = async (id: string) => {
    const { data } = await ManagementErrorEtcTransApi.reloadTransaction(id);

    if (data.code === ResponseCode.SUCCESS) {
      openNotification({ description: data.data.message });
    }
  };

  const onSubmit = (data: any) => {
    const formattedData: any = { ...data, page: 0, size: 10 };
    setSearch(formattedData);
  };

  return (
    <FormSearchCommon
        formItem
        options={options}
        isShowSubmit
        schema={formSchema}
        labelBtnSubmit="Tìm kiếm"
        typeIconBtnSubmit="search"
        onHandleSubmit={(form) => onSubmit(form)}
        layoutCommon={{ xxl: 6, xl: 6, md: 24, lg: 24, sm: 24, xs: 24 }}
        initValueForm={{
          fromDate: getBeforeDateByCurrentDate({ number: 7 }),
          toDate: getToDay(),
        }}
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
  );
}
