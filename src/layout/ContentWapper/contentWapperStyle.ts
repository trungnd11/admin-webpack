import styled, { keyframes } from "styled-components";
import { Devices, MainColor } from "../../component/variable";
import { fadeInUp } from "react-animations";

const SliderContentShow = keyframes`${fadeInUp}`;

export const ContentLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const SliderListMenu = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #00000052;
  transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 2;
  display: none;

  @media ${Devices.xs} {
    display: block;
  }

  @media ${Devices.md} {
    display: block;
  }
  
  .list-menu-slider {
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    animation: 0.6s ${SliderContentShow};
    z-index: 1;

    .ant-menu.ant-menu-root {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      li.ant-menu-item-selected {
        &::after {
          border-right-color: transparent;
          border-left-color: ${MainColor};
        }
      }
    }

    @media ${Devices.xs} {
      display: block;
    }

    @media ${Devices.md} {
      display: block;
    }
  }
`;
