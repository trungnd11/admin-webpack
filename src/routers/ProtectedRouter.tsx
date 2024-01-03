import { Navigate, useLocation } from "react-router-dom";
import { Authenticate } from "../enum/AuthorEnum";
import { PathEnum } from "../enum/PathEnum";
import { getLocalStorage } from "../helper/localStorage";

export default function ProtectedRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const location = useLocation();
  const auth = getLocalStorage(Authenticate.AUTH);

  const isNotPathTemplate = !location.pathname.includes(PathEnum.PATH_TEMPLATE);
  const shouldRenderChildren = !auth && isNotPathTemplate;
  const shouldRedirectToRoot = isNotPathTemplate && auth;

  if (shouldRenderChildren) {
    return children;
  }

  if (shouldRedirectToRoot) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return null;
}
