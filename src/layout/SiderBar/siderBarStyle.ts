import styled from "styled-components";
import { Color, FontSize } from "../../component/variable";
import { DownOutlined } from "@ant-design/icons";

export const SiderBarContainer = styled.div`
  
  &::-webkit-scrollbar {
    width: 0;
  }
  .ant-menu.ant-menu-root {
    min-height: 100%;
    border-bottom-right-radius: 0.5rem;
    background-color: ${Color.green};
    font-size: ${FontSize.F13};
    color: ${Color.white};

    .ant-menu-sub {
      background-color: ${Color.green};

      /* .ant-menu-item.ant-menu-item-only-child {
        padding-left: 20px !important;
      }  */
    }

    .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open > .ant-menu-sub {
      background-color: ${Color.white};
      color: ${Color.black};
    }

    .ant-menu-item, .ant-menu-submenu-title {
      line-height: 1.3 !important;
      min-height: 2.7rem;
      white-space: pre-wrap;
      display: flex;
    }

    .ant-menu-title-content {
      padding-right: 5px;
    }

    .ant-menu-item-selected {
      color: ${Color.black};
    }
  }

  .ant-menu.ant-menu-root > .ant-menu-item.ant-menu-item-selected {
    background-color: ${Color.subItemMenu};
    color: ${Color.white};
    font-weight: 700;
  }
  .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title {
    background-color: ${Color.subItemMenu};
    font-weight: 700;
    color: ${Color.white};
  }

  .ant-menu.ant-menu-root > .ant-menu-item.ant-menu-item-active {
    color: ${Color.white} !important;
  }

  .ant-menu.ant-menu-root > .ant-menu-submenu.ant-menu-submenu-active > .ant-menu-submenu-title {
    color: ${Color.white} !important;
  }
`;

export const IconDownStyle = styled(DownOutlined)`
  display: flex;
  align-items: center;
  svg {
    width: 0.6rem;
    position: absolute;
    right: .5rem;
    transition: all 0.6s;
  }
`;
