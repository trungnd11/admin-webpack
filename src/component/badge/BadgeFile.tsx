import { Badge } from "antd";
import type { BadgeProps } from "antd";

const BadgeFile = (props: BadgeProps) => {
  return (
    <Badge
      offset={[5, 7]}
      style={{ zIndex: "20" }}
      color="hwb(205 6% 9%)"
      {...props}
    />
  );
};

export default BadgeFile;
