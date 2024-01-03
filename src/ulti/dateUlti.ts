import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const formatDateToString = (props: {
  date?: Date | string | any
  format?: "DD/MM/YYYY" | "YYYY/MM/DD" | "DD-MM-YYYY" | "YYYY-MM-DD"
}) =>
  props.date ? dayjs(props.date).format(props.format ?? "DD/MM/YYYY") : dayjs().format(props.format ?? "DD/MM/YYYY");

export const getToDay = () => dayjs();

export const getafterDateByCurrentDate = (props: {
  currentDate?: Date | string | any
  number: number
  format?: "d" | "w" | "m" | "y"
}) => props?.currentDate
  ? dayjs(props.currentDate, "DD/MM/YYYY").add(
    props.number,
    props.format ?? "d"
  )
  : dayjs().add(
    props.number,
    props.format ?? "d"
  );

export const getBeforeDateByCurrentDate = (props: {
  currentDate?: Date | string | any
  number: number
  format?: "d" | "w" | "m" | "y"
}) => props?.currentDate
  ? dayjs(props.currentDate, "DD/MM/YYYY").add(
    props.number,
    props.format ?? "d"
  )
  : dayjs().subtract(
    props.number,
    props.format ?? "d"
  );

export const isDate = (date: any) => date instanceof dayjs || date instanceof Date;

export const formatStringToDate = (props: {
  date: string
  format?: "DD/MM/YYYY" | "YYYY/MM/DD" | "DD-MM-YYYY"
  milliseconds?: boolean
}) =>
  props.milliseconds && props.date
    ? dayjs(props.date)
    : props.date
      ? dayjs(props.date, props.format ?? "DD/MM/YYYY")
      : undefined;

export const checkDateRang = (props: {
  fromDate: string
  toDate: string
  rang: number
}) => {
  const { fromDate, toDate } = props;
  dayjs.extend(relativeTime);
  if (!fromDate || !toDate) {
    return true;
  }
  if (formatDateToString({ date: formatStringToDate({ date: fromDate }) }) === formatDateToString({ date: formatStringToDate({ date: toDate }) })) {
    return false;
  }
  const dateCheck = Number(getDateTime(dayjs(formatStringToDate({ date: fromDate })).add(6, "M")));
  const getToDateTime = Number(getDateTime(formatStringToDate({ date: toDate })));
  return !(dateCheck - getToDateTime >= 0);
};

export const getDateTime = (text: any) => {
  const m = dayjs(text, "DD/MM/YYYY").toDate().getTime();
  return m;
};

export const formatYearToDate = (year: string | number) => {
  return dayjs().year(Number(year));
};

export const secondsToDays = (seconds: number) => {
  if (!seconds) return 0;
  return seconds / 86400;
};
