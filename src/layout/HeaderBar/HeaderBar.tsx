import logo from "../../static/images/logo/VETC.png";
import SettingMenu from "./SettingMenu";
import { HeaderStyle } from "./hearderStyle";

export default function HeaderBar() {
  return (
    <HeaderStyle>
      <div className="logo">
        <img src={logo} alt="VETC" />
      </div>
      <div className="infomation">
        <SettingMenu />
      </div>
    </HeaderStyle>
  );
};
