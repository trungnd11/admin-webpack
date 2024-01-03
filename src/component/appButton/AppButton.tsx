import { Button, Tooltip } from "antd";
import { AppButtonStyle } from "./appButtonStyle";
import { TypeIconButton } from "./handleDateAppButton";
import { AppButtonModel } from "../../model/components/AppButtonModel";

export default function AppButton(props: AppButtonModel) {
  const {
    name,
    loading,
    type,
    typeIcon,
    ghost,
    htmlType,
    onClick,
    disabled,
    title,
    ...rest
  } = props;
  const TypeIcon = typeIcon && TypeIconButton[typeIcon];

  const ButtonChildren = (
    <Button
      {...rest}
      ghost={ghost ?? false}
      htmlType={htmlType ?? "button"}
      type={type ?? "primary"}
      loading={loading}
      icon={typeIcon && <TypeIcon />}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </Button>
  );

  return (
    <AppButtonStyle>
      {
        title
          ? (
          <Tooltip placement="top" title={title}>
            { ButtonChildren }
          </Tooltip>
            )
          : (
              ButtonChildren
            )
      }
    </AppButtonStyle>
  );
}
