import { ColumnsType } from "antd/es/table";
import { rowNumber } from "../../helper/functionCommon";
import AppInput from "../../component/appInput/AppInput";
import { OptionsFormType } from "../../model/components/FormCommonModel";
import { useState } from "react";
import FormSearchCommon from "../../component/form/formCommon/FormCommon";
import * as yup from "yup";
import { HistoryActionList, SearchHistoryAction } from "../../model/historyAction/historyActionModel";
import { fetchListHistoryAction } from "./HistoryActionServices";
import { useQuery } from "react-query";
import AppDatePicker from "../../component/appDatePicker/AppDatePicker";
import { formatDateToString, getBeforeDateByCurrentDate, getToDay } from "../../ulti/dateUlti";
import AppSelect from "../../component/appSelect/AppSelect";
import AppTable from "container/AppTable";

export default function HistoryAction() {
  const [search, setSearch] = useState<SearchHistoryAction>({
    page: 0,
    size: 10,
    field: "",
    targetObjectCode: "",
    action: "",
    fromDate: formatDateToString({ date: getBeforeDateByCurrentDate({ number: 7 }) }),
    toDate: formatDateToString({ date: getToDay() }),
  });

  const formSchema = yup.object({
    module: yup.string().nullable(),
    action: yup.string().nullable(),
  });

  const { data: listPage, isFetching: loading } = useQuery(["get-error-list", search],
    () => fetchListHistoryAction(search));

  const options: OptionsFormType[] = [
    {
      component: AppSelect,
      field: "targetObjectCode",
      label: "Bảng",
      addAll: true,
      typeSelectAsync: "tableList"
    },

    {
      component: AppInput,
      field: "field",
      label: "Trường",
      maxLength: 50,
    },

    {
      component: AppSelect,
      field: "action",
      label: "Hành động",
      options: [
        { value: "", label: "Tất cả" },
        { value: "CREATE", label: "Thêm" },
        { value: "UPDATE", label: "Sửa" },
        { value: "DELETE", label: "Xóa" },
      ],
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

  const columns: ColumnsType<HistoryActionList> = [
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
      dataIndex: "action",
      align: "center",
      width: 200
    },

    {
      title: "Bảng",
      dataIndex: "targetObjectCode",
      align: "center",
      width: 200
    },

    {
      title: "Trường",
      dataIndex: "field",
      align: "center",
      width: 100
    },

    {
      title: "Giá trị mới",
      dataIndex: "newValue",
      align: "center",
    },

    {
      title: "Giá trị cũ",
      dataIndex: "oldValue",
      align: "center",
    },

    {
      title: "Lý do",
      dataIndex: "reason",
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
  ];

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
          layoutCommon={{ xxl: 8, xl: 8, md: 8, lg: 24, sm: 24, xs: 24 }}
          initValueForm={{
            action: "",
            fromDate: getBeforeDateByCurrentDate({ number: 7 }),
            toDate: getToDay(),
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
            scroll={{ y: 400, x: 1200 }}
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
