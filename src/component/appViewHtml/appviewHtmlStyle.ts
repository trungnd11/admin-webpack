import styled from "styled-components";
import { Color } from "../variable";

export const AppViewHtmlStyle = styled.div`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  position: relative;

  .content::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .content::-webkit-scrollbar
  {
    width: 5px;
    height: 8px;
    background-color: #F5F5F5;
  }

  .content::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(67, 175, 5, 0.3);
    background-image: linear-gradient(to right, ${Color.borderTable} 0%, ${Color.borderTable} 51%, ${Color.borderTable} 100%);
  }

  .content {
    overflow-y: scroll;
    max-height: 200px;
    padding: 8px;
  }

  .app-btn-edit {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
