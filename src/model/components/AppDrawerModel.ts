import { DrawerProps } from "antd";

export interface AppDrawerModel extends DrawerProps {
  children?: React.ReactNode
  title?: string
  placement?: "top" | "right" | "bottom" | "left"
  width?: string | number
}

export interface RefDrawer {
  open: boolean
  setOpen: (open: boolean) => void
};
