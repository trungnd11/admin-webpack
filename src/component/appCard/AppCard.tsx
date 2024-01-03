import { Card } from "antd";
import { AppCardModel } from "../../model/components/AppCardModel";
import { AppCardStyle } from "./appCardStyle";

export default function AppCard(props: AppCardModel) {
  const { contents, size, extra, ...rest } = props;
  return (
    <AppCardStyle>
      <Card
        {...rest}
        bordered
        size={size ?? "small"}
        extra={extra}
      >
        { contents }
      </Card>
    </AppCardStyle>
  );
}
