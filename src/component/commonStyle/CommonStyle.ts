import { styled, createGlobalStyle, keyframes } from "styled-components";
import { Color, Devices, FontSize } from "../variable";
import { zoomIn } from "react-animations";

const AnimateBgLogin = keyframes`${zoomIn}`;

interface AlignComponentProps {
  notMargin?: boolean
  align?: "center" | "start" | "end"
  alignHeight?: "center" | "start" | "end"
  gap?: string
}
interface AppTitleProps {
  width?: string
  height?: number
  required?: boolean
}

export const AlignComponent = styled.div<AlignComponentProps>`
  margin-top: ${(prop) => (prop.notMargin ? "0" : "1rem")};
  display: flex;
  justify-content: ${(prop) => prop.align ?? "start"};
  align-items: ${(prop) => {
    return prop.alignHeight ?? "center";
  }};
  height: 100%;
  gap: ${(prop) => (prop.gap ?? "0")};
`;

export const AppTitle = styled.div<AppTitleProps>`
  flex-basis: ${(props) => (props.width ? props.width : "120px")};
  line-height: 1;
  white-space: pre-wrap;
  padding-right: 5px;
  height: ${props => props.height && `${props.height}px`};
  display: flex;

  span {
    display: flex;
    align-items: center;
  }

  @media ${Devices.xl} {
    width: ${(props) => (props.width ? props.width : "100px")};
    padding-right: 2px;
  }
`;

export const AppWapperInput = styled.div`
  flex-grow: 1;
  overflow: hidden;

  .validate {
    color: red;
    margin-top: 4px;
    line-height: 18px;
  }
`;

export const ErrorMessage = styled.span`
  color: ${Color.red};
  animation: 0.6s ${AnimateBgLogin} forwards;
`;

export const RequiredComponent = styled.span`
  color: ${Color.red};
  font-size: ${FontSize.F10};
`;

export const GlobalStyle = createGlobalStyle`
  .action-table.primary, .action-table.primary:disabled {
    color: #1677ff;
  }
  .action-table.danger, .action-table.danger:disabled {
    color: #ff4d4f;
  }
  .action-table:disabled {
    opacity: 20%;
  }

  .close-modal {
    background-color: #868b88 !important;
    color: white !important;
  }
`;

export const FooterModalComponent = styled.div`
  padding: 10px;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  column-gap: 2rem;
  margin-top: 10px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1rem;
    width: 120%;
    background-color: ${Color.borderTable};
    height: 1px;
  }

  button {
    min-width: 80px !important;
  }
`;
