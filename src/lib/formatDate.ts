import { DateValue } from "../components/MyCalender";
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
  const mondayDateOfWeek = subtractDate(date, (dayjs(date as Date).day() + 6) % 7);
  const sundayDateOfWeek = addDate(date, (7 - dayjs(date as Date).day()) % 7);

  return [mondayDateOfWeek, sundayDateOfWeek];
};

export const compareDate = (selectedDate: Date, dateRange: string[]) => {
  const fromDate = dayjs(dateRange[0]).startOf("day");
  const toDate = dayjs(dateRange[1]).startOf("day");
  const date = dayjs(selectedDate).startOf("day");
  if (date.isSame(fromDate) || date.isSame(toDate) || (date.isAfter(fromDate) && date.isBefore(toDate))) return true;
  else return false;
};
