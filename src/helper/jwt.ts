import jwt_decode from "jwt-decode";
import { Authenticate } from "../enum/AuthorEnum";
import { getLocalStorage } from "./localStorage";

export const getUsername = () => {
  const token = getLocalStorage(Authenticate.AUTH);
  const decode: any = token && jwt_decode(token);
  return decode?.preferred_username || "";
};

export const getTransId = (token?: string) => {
  const decode: any = token && jwt_decode(token);
  return decode?.transaction_id ?? JSON.parse(decode.one_account)?.transaction_id;
};
