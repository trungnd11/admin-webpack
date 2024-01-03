import ReactHtmlParser from "react-html-parser";
import { AppViewHtmlModel } from "../../model/components/AppViewHtmlModel";
import { AppViewHtmlStyle } from "./appviewHtmlStyle";
import AppButton from "../appButton/AppButton";

export default function AppViewHtml(props: AppViewHtmlModel) {
  const { content, labelEdit, handleEdit } = props;

  return (
    <AppViewHtmlStyle>
      <div className="content">
        {
          ReactHtmlParser(content)
        }
      </div>
      {
        handleEdit && (
          <div className="app-btn-edit">
            <AppButton
              typeIcon="edit"
              name={labelEdit}
              onClick={handleEdit}
            />
          </div>
        )
      }
    </AppViewHtmlStyle>
  );
}
