import styled from "styled-components";
import { Color } from "../variable";

interface PropsAppTable {
  hidePage?: boolean
  isOnRowClick?: boolean
}

export const AppTableStyle = styled.div<PropsAppTable>`
  .ant-table-content::-webkit-scrollbar-track, .ant-table-body::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .ant-table-content::-webkit-scrollbar, .ant-table-body::-webkit-scrollbar
  {
    width: 5px;
    height: 8px;
    background-color: #F5F5F5;
  }

  .ant-table-content::-webkit-scrollbar-thumb, .ant-table-body::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(67, 175, 5, 0.3);
    background-image: linear-gradient(to right, ${Color.borderTable} 0%, ${Color.borderTable} 51%, ${Color.borderTable} 100%);
  }

  .ant-table-body {
    border-bottom: 1px solid ${Color.borderTable};
  }

  table {
    border-color: ${Color.black};
  }
  .ant-table-wrapper {
    font-size: 13px;
    .ant-table-thead > tr > th {
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      text-align: center !important;
      background: #fafafa;
      transition: background 0.3s ease;
      padding: 2px 5px;

      &::before {
        display: none;
      }
    }

    .ant-table-thead {
      .ant-table-cell {
        /* background: ${Color.green}; */
        /* color: ${Color.white}; */
      }
    }

    .ant-table-tbody {
      .ant-table-cell {
        padding: 2px 5px;
        cursor: ${props => props.isOnRowClick && "pointer"};
      }
    }
  }
  .ant-table-thead {
    th {
      text-align: center !important;
    }
  }

  .ant-pagination {
    display: ${props => props.hidePage && "none"};
  }
`;
