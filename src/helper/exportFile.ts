import dayjs from "dayjs";

export const exportFile = (props: { data: any, fileName: string | undefined, headers: any, type?: "excel" | "file" }) => {
  const { data, fileName, headers, type } = props;

  const checkTypeFile = () => type && type === "file";
  const fileNameHearder = checkTypeFile()
    ? headers["content-disposition"]?.match(/filename\s*=\s*"(.+)"/i)[1]
    : headers["content-disposition"]?.split("filename=")[1]?.split(".")[0];
  const temp = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = temp;

  if (checkTypeFile()) {
    link.setAttribute("download", `${fileNameHearder ?? fileName}`);
  } else {
    link.setAttribute("download", `${fileNameHearder ?? fileName + dayjs().format("DDMMYYYY")}.xlsx`);
  }
  document.body.appendChild(link);
  link.click();
};

export const convertBlobToString = (blob: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(blob);
  });
};

export const exportFileFromUrl = (props: { url: string, fileName: string }) => {
  const { url, fileName } = props;
  const link = document.createElement("a");

  link.href = url;

  link.setAttribute("download", `${fileName}`);

  document.body.appendChild(link);

  link.click();
};
