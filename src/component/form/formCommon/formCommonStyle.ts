import { styled } from "styled-components";
import { Color } from "../../variable";

export const FormSearchCommontStyle = styled.div`
  margin-bottom: 1rem;
  .ant-collapse {
    background-color: ${Color.green};
    border: none;

    .ant-collapse-header {
      padding: 8px 16px !important;
      color: ${Color.white};
    }

    .ant-collapse-item {
      border: none;

      &:last-child >.ant-collapse-content {
        border: 1px solid #f0f0f0;
        border-radius: 0 0 8px 8px;
      }
    }
  };

  .ant-card {
    margin-top: 1.5rem;
  }
`;

export const HeaderSearch = styled.div`
  .title-search {
    padding-left: .5rem;
  }
`;

export const FormBodyItemStyle = styled.div`
  .action-container {
    position: absolute;
    bottom: 22px;
    right: 0;
  }

  &.vertical-form {
    .ant-form-item-label {
      flex-basis: auto !important;
      width: 100%;

      .ant-form-item-required::before {
        right: -12px;
      }
    }
  }

  .checkbox {
    .ant-form-item-row {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: start;
      gap: 10px;
      padding-top: 25px;
      
      .ant-form-item-label {
        width: fit-content;
        padding: 0;
      }

      .ant-form-item-control {
        max-width: fit-content;
      }
    }
  }
`;
