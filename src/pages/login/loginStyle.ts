import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import bg from "@static/images/bg/bg.png";
import { BorderRadius, Color, Devices } from "../../component/variable";

const AnimateBgLogin = keyframes`${zoomIn}`;

export const LoginContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(19deg, #138927 0%, #B721FF 100%); */
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;

  @media ${Devices.xs} {
    background-position-x: 20%;
  }

  .form-container {
    background-color: #ffffff7a;
    position: absolute;
    border-radius: ${BorderRadius.border6};
    width: 25%;
    overflow: hidden;
    animation: 0.6s ${AnimateBgLogin} forwards;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    left: 20%;

    @media ${Devices.xs} {
      width: 90%;
      min-height: 30%;
      left: 50%;
      transform: translateX(-50%);
    }

    @media ${Devices.md} {
      width: 60%;
      min-height: 30%;
      background-position-x: 20%;
    }

    @media ${Devices.lg} {
      width: 60%;
      min-height: 30%;
    }

    @media ${Devices.xl} {
      width: 30%;
      min-height: 45%;
    }

    .bg-image {
      text-align: center;
      padding-top: 1rem;
      img {
        width: 35%;
      }

      @media ${Devices.md} {
        display: none;
      }
    }

    .form {
      padding: 0 2rem 2rem 2rem;
      flex-grow: 1;
      display: flex;
      align-items: center;

      h4 {
        text-transform: uppercase;
        font-weight: 700;
        color: ${Color.blueText};
        margin-bottom: 1rem;
      }
      
      form {
        flex-basis: 100%;
      }

      @media ${Devices.xl} {
        padding: 0 1rem 1rem 1rem;
      }
    }


    .title, .button  {
      text-align: center;
      color: ${Color.green} !important;
    }

    .button {
      button {
        width: 100%;
        background-color: ${Color.green};
      }
    }
  }
`;
