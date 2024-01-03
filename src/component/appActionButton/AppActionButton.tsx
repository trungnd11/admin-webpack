import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { ActionButtonStyle } from "../../pages/paramsManagement/apParamsManagementStyle";
import { AppActionButtonModel } from "../../model/components/AppActionButtonModel";
import { TypeActionButtonEnum } from "../../enum/component/ActionButtonEnum";
import usePrivileges from "../hook/usePrivileges";
import { checkRole } from "../../helper/helper";
import { showTitleNotRole } from "./AppActionButtonServices";
import { PermissionEnum } from "../../enum/RoleEnum";

export default function AppActionButton(props: AppActionButtonModel) {
  const { handleClick, title, disabled } = props;
  const { update, deletes } = usePrivileges();

  const handleClickActionBtn = (type: TypeActionButtonEnum) => {
    handleClick(type);
  };

  const ButtonUpdate = (
    <Button
      type="link"
      disabled={checkRole(update) || disabled}
      icon={<EditOutlined />}
      onClick={() => handleClickActionBtn(TypeActionButtonEnum.UPDATE)}
    />
  );

  const ButtonDelete = (
    <Button
      danger
      type="link"
      disabled={checkRole(deletes) || disabled}
      icon={<DeleteOutlined />}
      onClick={() => handleClickActionBtn(TypeActionButtonEnum.DELETE)}
    />
  );

  return (
    <ActionButtonStyle>
      {
        checkRole(update) || title?.update
          ? (
            <Tooltip placement="top" title={checkRole(update)
              ? showTitleNotRole(PermissionEnum.UPDATE)
              : title?.update}>
            { ButtonUpdate }
          </Tooltip>
            )
          : ButtonUpdate
      }
      {
        checkRole(deletes) || title?.delete
          ? (
            <Tooltip placement="top" title={checkRole(deletes)
              ? showTitleNotRole(PermissionEnum.DELETE)
              : title?.delete}>
              {ButtonDelete}
            </Tooltip>
            )
          : ButtonDelete
      }
    </ActionButtonStyle>
  );
}
