import styled from "styled-components";
import { Color } from "../../component/variable";

export const HeaderStyle = styled.div`
  color: ${Color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;

  h3 {
    color: ${Color.white};
    margin-bottom: 0;
  }

  .logo {
    img {
      height: 100%;
      width: 8%;
    }
  }

  .infomation {
    display: flex;
    justify-content: right;
    align-items: center;
    min-width: 15rem;

    span {
      color: ${Color.white};
    }
    span.anticon-bell {
      cursor: pointer;
      svg {
        width: 1.2rem;
        height: 1.2rem;
        color: ${Color.white};
      }
    }

    .text-user {
      text-transform: capitalize;
    }

    .user-avatar {
      border: .5px solid ${Color.white};
    }

    .ant-dropdown-trigger {
      .ant-space-item {
        font-weight: 600;
      }
    }
  }
`;
