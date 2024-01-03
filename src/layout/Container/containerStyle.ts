import styled from "styled-components";
import { BorderRadius, Color, Devices, HeaderComponent, Padding } from "../../component/variable";

export const ContainerStyle = styled.div`
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    background-color: ${Color.green};
    border-bottom: 1px solid ${Color.white};

    .logo {
      img {
        @media ${Devices.xs} {
          width: 100%;
        }

        @media ${Devices.md} {
          width: 20%;
        }
      }
    }
  }

  .ant-layout-sider {
    overflow: auto;
    position: fixed;
    left: 0px;
    top: ${HeaderComponent.height};
    bottom: 0px;
    overflow-x: hidden;
    background-color: ${Color.green};

    @media ${Devices.xl} {
      min-width: 200px !important;
      width: 200px !important;
    }

    .trigger {
      position: absolute;
      bottom: 0;
      padding: 1rem;
      width: 100%;
      justify-content: center;

      svg {
        color: ${Color.white};
        width: 1.1rem;
        height: 1.1rem;
      }
    }
  }

  .ant-layout-sider.ant-layout-sider-collapsed {
    @media ${Devices.xl} {
      min-width: 80px !important;
      width: 80px !important;
    }
  }

  #content {
    margin-top: 100px !important;

    .site-layout-background {
      min-height: 100%;
      background-color: ${Color.grayBland};
      padding: 1rem;
      position: relative;

      .description-content {
        background-color: ${Color.white};
        border-radius: ${BorderRadius.border6};
        padding: ${Padding.P10};
        min-height: 100%;
      }
    }
  }

  #footer {
    background-color: ${Color.grayBland};
    text-align: center;
    padding: 1rem;
    border-top: .5px solid ${Color.green};
  }
`;
