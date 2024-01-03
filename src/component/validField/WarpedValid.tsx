import type { CSSProperties } from "react";
import WarpedValidStyle from "./WarpedValidStyle";

interface CustomProps {
  message?: string | null | undefined
  children?: any
  style?: CSSProperties | undefined
}

const WarpedValid = (props: CustomProps) => {
  return (
    <WarpedValidStyle style={props.style}>
      <div className={props.message ? "hight-light-field" : ""}>
        {props.children}
      </div>
      {props.message ? <span className="valid-message">{props.message}</span> : <></>}
    </WarpedValidStyle>
  );
};

export default WarpedValid;
