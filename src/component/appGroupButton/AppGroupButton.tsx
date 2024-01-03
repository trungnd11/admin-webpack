import { AppGroupButtonModel } from "../../model/components/AppButtonModel";
import AppButton from "../appButton/AppButton";
import usePrivileges from "../hook/usePrivileges";
import { AppGroupButtonStyle } from "./appButtonStyle";

const AppGroupButton = (props: AppGroupButtonModel) => {
  const {
    options,
    onDelete,
    onSend,
    onPause,
    onStop,
    onEdit,
    onContinue,
    onAssign,
    onApprove,
    onReject,
    onDetail,
  } = props;

  const {
    approve,
    sendApprove,
    viewDetails,
    deletes,
    reject,
    update,
  } = usePrivileges();

  const getDisableCondition = (type: string, isDisabled: boolean) => {
    switch (type) {
      case "pause":
      case "stop":
      case "edit":
      case "continue":
      case "assign":
        return isDisabled || update;
      case "delete":
        return isDisabled || deletes;
      case "send":
        return isDisabled || sendApprove;
      case "approve":
        return isDisabled || approve;
      case "cancel":
        return isDisabled || reject;
      case "detail":
        return isDisabled || viewDetails;
      default:
        return false;
    }
  };

  const getOnClick = (type: string) => {
    switch (type) {
      case "pause":
        return onPause;
      case "stop":
        return onStop;
      case "edit":
        return onEdit;
      case "continue":
        return onContinue;
      case "assign":
        return onAssign;
      case "delete":
        return onDelete;
      case "send":
        return onSend;
      case "approve":
        return onApprove;
      case "cancel":
        return onReject;
      case "detail":
        return onDetail;
    }
  };

  return (
    <AppGroupButtonStyle>
      {options.map((item: any, index: number) => {
        return item.isShow && <AppButton
          key={index}
          ghost
          typeIcon={item.type}
          name={""}
          title={item.title}
          disabled={getDisableCondition(item.type, item.isDisabled)}
          onClick={getOnClick(item.type)}
        />;
      })}
    </AppGroupButtonStyle>
  );
};

export default AppGroupButton;
