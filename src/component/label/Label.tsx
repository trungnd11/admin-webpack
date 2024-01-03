interface CustomProps {
  children?: any
  required?: boolean
}

const Label = (props: CustomProps) => {
  return (
    <label>
      {props.children}
      {props.required ? <b style={{ color: "red" }}>{" *"}</b> : null}
    </label>
  );
};

export default Label;
