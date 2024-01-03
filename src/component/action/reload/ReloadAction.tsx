import { ReloadOutlined } from "@ant-design/icons";
import { ReloadActionStyle } from "./reloadActionStyle";
import { ReloadAcitonModel } from "../../../model/components/ReloadActionModel";
import { Button, Tooltip } from "antd";
import usePrivileges from "../../hook/usePrivileges";
import { NotPermissionMessageEnum } from "../../../enum/RoleEnum";

export default function ReloadAction(props: ReloadAcitonModel) {
  const { onClick, title, positionTitle } = props;
  const { update } = usePrivileges();

  const getTitleAction = () =>
    !update ? NotPermissionMessageEnum.UPDATE : title;

  return (
    <Tooltip title={getTitleAction()} placement={positionTitle ?? "right"}>
      <ReloadActionStyle onClick={onClick} disabled={!update}>
        <Button
          type="link"
          disabled={!update}
          icon={<ReloadOutlined />}
        />
      </ReloadActionStyle>
    </Tooltip>
  );
}
