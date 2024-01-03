import { Checkbox } from "antd";
import { AppCheckboxModel } from "../../model/components/AppCheckboxModel";

function AppCheckbox(props: AppCheckboxModel) {
  const {
    title,
    ...rest
  } = props;

  return (
      <>
         <Checkbox
            {...rest}
         >
            {title}
         </Checkbox>
      </>
  );
};

export default AppCheckbox;
