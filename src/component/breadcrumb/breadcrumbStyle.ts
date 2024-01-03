import { bounceInRight } from "react-animations";
import styled, { keyframes } from "styled-components";
import { Color, Devices, HeaderComponent } from "../variable";

const AnimateBreadscrumb = keyframes`${bounceInRight}`;

export const BreadcrumbContainer = styled.div`
  z-index: 10;
  position: fixed;
  top: ${HeaderComponent.height};
  right: 0;
  padding: .5rem 1rem;
  background-color: ${Color.white};
  animation: 0.6s ${AnimateBreadscrumb} forwards;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  
  @media ${Devices.xs} {
    display: flex;
    justify-content: space-between;
  }

  @media ${Devices.md} {
    display: flex;
    justify-content: space-between;
  }
  
  .last-item {
    color: ${Color.black};
  }

  .menu-btn {
    display: none;
    
    @media ${Devices.xs} {
      display: block
    }

    @media ${Devices.md} {
      display: block
    }
  }
`;
