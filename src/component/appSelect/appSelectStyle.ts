import { styled } from "styled-components";

export const AppSelectStyle = styled.div`
  display: flex;

  .required {
    span::after {
      content: "*";
      color: red;
      margin-left: 4px;
    }
  }
`;
