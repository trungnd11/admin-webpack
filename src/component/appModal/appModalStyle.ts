import { Modal } from "antd";
import { styled } from "styled-components";
import { Color } from "../variable";

export const AppModalStyle = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-close {
    color: ${Color.white};
    top: 10px;
  }

  .ant-modal-header {
    padding: 10px 24px;
    background: ${Color.green};
    margin-bottom: 0;

    .ant-modal-title {
      color: ${Color.white};
      text-transform: uppercase;
      text-align: center;
      font-size: 14px !important;
    }
  }

  .ant-modal-body {
    padding: 10px;
  }

  .ant-modal-footer {
    margin-top: 0;
    padding: 10px;
    text-align: center;
    border-top: 1px solid ${Color.borderTable};
    display: flex;
    justify-content: center;
    column-gap: 2rem;

    button {
      min-width: 80px !important;
      box-shadow: none;
    }
  }

  .btn-cancel {
    background-color: #868b88;
    color: #fff;
  }
`;
