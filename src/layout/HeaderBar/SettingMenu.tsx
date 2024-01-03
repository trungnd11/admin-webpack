import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Color } from "../../component/variable";
import { ConfirmAlert } from "../../component/alert/ComfirmAlert";
import { useAppDispatch } from "../../store/reduxHook";
import { Key } from "../../enum/commom";
import { logout } from "../../store/auth/auth";
import { getUsername } from "../../helper/jwt";

const { Text } = Typography;

const items: MenuProps["items"] = [
  // {
  //   label: (
  //     <Space>
  //       <InfoCircleOutlined />
  //       <Text>Infomation Account</Text>
  //     </Space>
  //   ),
  //   key: Key.ONE
  // },
  // {
  //   label: (
  //     <Space>
  //       <SafetyOutlined />
  //       <Text>Change password</Text>
  //     </Space>
  //   ),
  //   key: Key.TWO
  // },
  // {
  //   type: "divider"
  // },
  {
    label: (
      <Space>
        <LogoutOutlined style={{ color: Color.red }} />
        <Text type="danger">Đăng xuất</Text>
      </Space>
    ),
    key: Key.THREE
  }
];

export default function SettingMenu() {
  const dispatch = useAppDispatch();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    key === Key.THREE &&
      ConfirmAlert({
        content: "Bạn có muốn đăng xuất?",
        handleOk: () => {
          dispatch(logout());
        }
      });
  };

  return (
    <Space>
      <Text className="text-user">{getUsername() || ""}</Text>
      <Dropdown menu={{ items, onClick }} trigger={["click"]} arrow>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar icon={<UserOutlined />} className="user-avatar" />
        </a>
      </Dropdown>
    </Space>
  );
};
