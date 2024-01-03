import { styled } from "styled-components";
import { Color } from "../variable";

export const AppCardStyle = styled.div`
  .ant-card {
    .ant-card-head {
      background-color: ${Color.green} !important;

      .ant-card-head-title {
        font-weight: 400;
      }
    }
  }
`;
