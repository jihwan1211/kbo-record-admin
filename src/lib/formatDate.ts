import { DateValue } from "@/store/DateStore";
import dayjs from "dayjs";

// 날짜를 빼는 함수
const subtractDate = (date: DateValue, days: number) => {
  return dayjs(date as Date)
    .subtract(days, "day")
    .format("YYYY-MM-DD");
};

// 날짜를 더하는 함수
const addDate = (date: DateValue, days: number) => {
  return dayjs(date as Date)
    .add(days, "day")
    .format("YYYY-MM-DD");
};

export const getWeekRange = (date: DateValue) => {
  const mondayDateOfWeek = dayjs(date as Date)
    .startOf("week")
    .add(1, "day")
    .format(`YYYY-MM-DD`); // 월요일
  const sundayDateOfWeek = dayjs(date as Date)
    .endOf("week")
    .add(1, "day")
    .format(`YYYY-MM-DD`); // 일요일

  return [mondayDateOfWeek, sundayDateOfWeek];
};

export const getMondayDateOfWeek = (date: DateValue) => {
  const mondayDateOfWeek = subtractDate(date, (dayjs(date as Date).day() + 6) % 7);

  return new Date(mondayDateOfWeek);
};

export const compareDate = (selectedDate: Date, dateRange: string[]) => {
  const fromDate = dayjs(dateRange[0]).startOf("day");
  const toDate = dayjs(dateRange[1]).startOf("day");
  const date = dayjs(selectedDate).startOf("day");
  if (date.isSame(fromDate) || date.isSame(toDate) || (date.isAfter(fromDate) && date.isBefore(toDate))) return true;
  else return false;
};
