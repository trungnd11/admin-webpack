import { LoadingOutlined } from "@ant-design/icons";
import ReloadAction from "../../component/action/reload/ReloadAction";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { ReloadCacheSearchParams } from "../../model/reloadCacheModel/ReloadCacheModel";
import { fetchParamsListAppCache, fetchReloadAppCache } from "./ReloadCacheServices";
import { useQuery } from "react-query";
import { ApParamGroupCode } from "../../enum/ApParamEnum";
import { ApParamsModel } from "../../model/apParamsManagementModel/ApParamsManagementModel";
import AppTable from "container/AppTable";

export default function ReloadCache() {
  const [isLoading, setIsLoading] = useState<string>();
  const [search, setSearch] = useState<ReloadCacheSearchParams>({
    parGroup: ApParamGroupCode.RELOAD_CACHE,
    parName: "",
    parType: "",
    parValue: "",
    page: 0,
    size: 10
  });

  const { data: listReloadCache, isFetching } = useQuery(["get-params-list-reload-cache", search],
    () => fetchParamsListAppCache(search));

  const columns: ColumnsType<ApParamsModel> = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 50,
      align: "center",
      render: (_value, _record, index) => index + 1
    },
    {
      title: "Hành động",
      dataIndex: "parValue",
      align: "center",
      width: 200,
      render: (value, record) => isLoading && isLoading === value
        ? (
          <LoadingOutlined />
          )
        : (
            <ReloadAction
            title="Tải lại cache"
            onClick={() => {
              setIsLoading(value);
              fetchReloadAppCache(record, setIsLoading);
            }}
            />
          )
    },
    {
      title: "Dự án",
      dataIndex: "parName",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "50%",
    },
  ];

  return (
    <>
      <AppTable
        loading={isFetching}
        columns={columns}
        dataSource={listReloadCache?.data}
        pageOption={{
          size: search.size,
          current: search.page + 1,
          total: listReloadCache?.totalElements
        }}
        onPage={({ page, size }) => {
          setSearch({ ...search, page: page ?? search?.page, size: size ?? search?.size });
        }}
      />
    </>
  );
}
