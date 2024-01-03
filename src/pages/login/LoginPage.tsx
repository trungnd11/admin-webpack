import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { LoginContainer } from "./loginStyle";
import bg from "../../static/images/logo/VETC_1.png";
import { getAuthorStore, loginEim } from "../../store/auth/auth";
import Login from "container/Login";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loadding } = useAppSelector(getAuthorStore);

  const onFinish = (dataForm: any) => {
    dispatch(loginEim(dataForm));
  };

  return (
    <LoginContainer>
      <Login logo={bg} isLoadingBtn={loadding} actionLogin={onFinish} />
    </LoginContainer>
  );
}
