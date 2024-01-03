import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationModel {
  title?: string
  description: React.ReactNode
  type?: NotificationType
}

export const openNotification = (props: NotificationModel) => {
  const { title, description, type = "success" } = props;

  notification.open({
    message: title,
    description,
    type,
    onClick: () => {},
  });
};
