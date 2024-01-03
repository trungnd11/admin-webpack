import styled from "styled-components";
import { Color } from "../variable";

export const AppButtonStyle = styled.div`
  button {
    background-color: ${Color.green};
    box-shadow: none;

    &:disabled {
      background-color: ${Color.gray};
      color: ${Color.white};
    }
  };

  .ant-btn-dangerous {
    background-color: transparent;
  }
`;
