import { isEmptyArrayRole } from "../ulti/arrayUlti";
import { checkDateRang } from "../ulti/dateUlti";

export const checkRole = (checkRole?: boolean) => !checkRole;

export const checkRoleExport = <T = undefined>(data?: T[] | any, checkRole?: boolean) => {
  if (isEmptyArrayRole(data) || isEmptyArrayRole(data?.data)) {
    return true;
  }
  if (!checkRole) {
    return true;
  }
  return false;
};

export const getBase64Slice = (data?: any) =>
  data && data.substring(data.indexOf(",") + 1);

export const convertBase64 = (file: any) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    resolve(getBase64Slice(fileReader.result));
  };
  fileReader.onerror = (error) => {
    reject(error);
  };
});

export const checkDateInSixMonth = (fromDateString?: string, toDateString?: string) => {
  if (fromDateString && toDateString) {
    return checkDateRang({ fromDate: fromDateString, toDate: toDateString, rang: 6 });
  }
  return true;
};

export const filterSelectOption = (input: any, event: any) => {
  return String(event.label).toLowerCase().includes(input.toLowerCase()) || String(event.value).toLowerCase().includes(input.toLowerCase());
};
