import { Table } from "antd";
import { AppTableStyle } from "./appTableStyle";
import { generateId } from "../../ulti/genertateIdUlti";
import { AppTableModel } from "../../model/components/AppTableModel";
import { useState } from "react";

export default function AppTable<T>(props: AppTableModel<T>) {
  const {
    columns,
    dataSource,
    pageOption,
    loading,
    hidePage,
    onChangeFilter,
    rowClassName,
    scroll,
    onPage,
    locale,
    className,
    onClickRow,
    ...rest
  } = props;

  const generateDataSource = dataSource?.map((item: any) => ({
    ...item,
    key: item.key ? item.key : `${generateId()}`
  }));
  const [rowClassActive, setRowClassActive] = useState<number>();

  const showTotal = (total: number, range: number[]) => (
    `Đang xem ${range[0]} - ${range[1]} trong tổng ${total} bản ghi`
  );

  const getRowClassName = (_record: any, index: number): any => {
    if (onClickRow) {
      return index === rowClassActive ? "ant-table-row-selected" : "";
    }
    return "";
  };

  return (
    <AppTableStyle hidePage={hidePage} isOnRowClick={onClickRow && true}>
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={generateDataSource}
        rowSelection={rest.rowSelection}
        pagination={{
          responsive: true,
          pageSize: pageOption?.size ?? 10,
          current: pageOption?.current,
          total: pageOption?.total,
          locale: { items_per_page: "" },
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total, range) => showTotal(total, range)
        }}
        onChange={(pagination, filters, _sorter) => {
          onChangeFilter && onChangeFilter(filters);
          onPage && onPage({
            page: pagination.current && pagination?.current - 1,
            size: pagination.pageSize
          });
        }}
        onRow={(record, index) => {
          return {
            onClick: () => {
              onClickRow && onClickRow(record, index);
              setRowClassActive(index);
            }
          };
        }}
        rowClassName={
          rowClassName ?? getRowClassName
        }
        className={className}
        locale={{
          triggerAsc: "Click để sắp xếp theo thứ tự tăng dần",
          triggerDesc: "Click để sắp xếp theo thứ tự giảm dần",
          cancelSort: "Click để bỏ sắp xếp",
          emptyText: locale && locale.emptyText ? locale.emptyText : "Không có dữ liệu hiển thị",
          filterReset: "Bỏ lọc",
          filterSearchPlaceholder: "Tìm kiếm",
          filterConfirm: "Lọc"
        }}
        scroll={scroll ?? { x: 1000 }}
      />
    </AppTableStyle>
  );
}
