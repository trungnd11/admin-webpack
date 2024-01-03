import { Drawer } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { AppDrawerModel } from "../../model/components/AppDrawerModel";

function AppDrawer(props: AppDrawerModel, ref: any) {
  const {
    children,
    title,
    placement,
    width,
    onClose,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open,
      setOpen
    }),
    [open]
  );

  return (
      <Drawer
         {...rest}
         title={title}
         placement={placement}
         onClose={(e) => {
           onClose && onClose(e);
           setOpen(false);
         }}
         open={open}
         width={width ?? 378}
      >
         {children}
      </Drawer>
  );
}

export default forwardRef(AppDrawer);
