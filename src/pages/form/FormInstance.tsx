
import { useState, useRef } from "react";
import { Col, Row } from "antd";
import AppDatePicker from "../../component/appDatePicker/AppDatePicker";
import AppSelect from "../../component/appSelect/AppSelect";
import { OptionsFormType } from "../../model/components/FormCommonModel";
import AppTable from "../../component/appTable/AppTable";
import { ColumnsType } from "antd/es/table";
import { getToDay } from "../../ulti/dateUlti";
import { schemas } from "./dataValidate";
import AppInput from "../../component/appInput/AppInput";
import AppModal from "../../component/appModal/AppModal";
import { RefModal } from "../../model/components/AppModalModel";
import { AlignComponent } from "../../component/commonStyle/CommonStyle";
import AppButton from "../../component/appButton/AppButton";
import FormLogin from "./FormLogin";
import FormCommon from "../../component/form/formCommon/FormCommon";

const options: OptionsFormType[] = [
  {
    component: AppInput,
    field: "transCode",
    label: "Mã giao dịch",
  },
  {
    component: AppSelect,
    field: "partner",
    label: "Đối tác",
    allowClearSelect: true
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
  }
];

export default function FormInstance() {
  const [dataFormSearch, setDataFormSearch] = useState<string>();
  const refModal = useRef<RefModal>();

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 100,
      align: "center",
    },
    {
      title: "Ngày tổng hợp",
      dataIndex: "transCode",
      align: "left",
      width: 150,
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "transDateTime",
      align: "center",
      width: 150,
    },
    {
      title: "Đối tác",
      dataIndex: "productName",
      align: "left",
      width: 180,
    },
    {
      title: "Tài khoản hệ thống",
      dataIndex: "custName",
      align: "left",
      width: 180,
    },
    {
      title: "Phát sinh",
      dataIndex: "custPhoneNumber",
      align: "right",
      width: 150,
    },
    {
      title: "Điều chỉnh",
      dataIndex: "amount",
      align: "right",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      align: "right",
    },
    {
      title: "Đã thanh toán",
      dataIndex: "amount",
      align: "right",
    },
    {
      title: "Còn lại",
      dataIndex: "amount",
      align: "right",
    }
  ];

  const openModal = () => {
    refModal.current?.setOpenModal(true);
  };

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <FormCommon
          formItem
          labelBtnSubmit="Tìm kiếm"
          typeIconBtnSubmit="search"
          layoutWrapperButton={{ sm: 24, md: 24, lg: 24, xl: 16, xxl: 24 }}
          initValueForm={{ partner: "1", toDate: getToDay(), fromDate: getToDay() }}
          options={options}
          schema={schemas}
          onHandleSubmit={(value) => setDataFormSearch(JSON.stringify(value))}
        >
          <AppTable
            columns={columns}
            dataSource={[]}
          />
        </FormCommon>
      </Col>
      {
        dataFormSearch && (
          <Col span={24}>
            {dataFormSearch}
          </Col>
        )
      }
      {
        dataFormSearch && (
          <Col span={24}>
            <AppTable
              columns={columns}
              dataSource={[]}
            />
          </Col>
        )
      }
      <Col span={24}>
        <AlignComponent notMargin align="end">
          <AppButton
            name="Open"
            onClick={openModal}
          />
        </AlignComponent>
      </Col>
      <AppModal
        isFormItem
        ref={refModal}
        content={
          <FormLogin
            onCancel={() => refModal.current?.setOpenModal(false)}
            onHandleSubmit={(value) => console.log({ value })}
          />}
      />
    </Row>
  );
}
