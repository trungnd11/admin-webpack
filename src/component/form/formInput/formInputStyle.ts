import { styled } from "styled-components";
import { Devices } from "../../variable";

interface PropsFormInputStyle {
  titleWidth?: number
};

export const FormInputStyle = styled.div<PropsFormInputStyle>`
  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-form-item.ant-form-item-has-error {
    min-height: 54px;

    @media ${Devices.xl} {
      min-height: 76px;
    }
  }

  .ant-form-item-row {
    @media ${Devices.xl} {
      display: block;
    }

    .ant-form-item-label, .ant-form-item-control { 
      @media ${Devices.xl} {
        max-width: 100%;
      }

      label {
        @media ${Devices.xl} {
          height: inherit;
        }
      }
    }

    .ant-form-item-label {
      flex-basis: ${props => props.titleWidth ? `${props.titleWidth}px` : "120px"};
      white-space: pre-wrap;
      text-align: start;
      line-height: 1.3;
    }
  }
  
  .ant-form-item-required {
    &::before {
      position: absolute;
      margin-inline-end: inherit !important;
      right: 0px;
      padding-left: 4px;
    }
  }

  .ant-form-item-has-error {
    height: max-content;
  }
`;
