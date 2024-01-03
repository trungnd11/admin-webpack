import { styled } from "styled-components";

export const DatePickerStyle = styled.div`
  display: flex;

  .required {
    span::after {
      content: "*";
      color: red;
      margin-left: 4px;
    }
  }

  .ant-picker {
    width: 100%;
  }
`;
