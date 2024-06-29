import { useState } from "react";
import { getWeekRange, getMondayDateOfWeek } from "../lib/formatDate";

export type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const useWeekRecord = () => {
  // week 달력 관련 상태
  const [date, setDate] = useState<DateValue>(new Date());
  const [mondayOfWeek, setMondayOfWeek] = useState(() => getMondayDateOfWeek(new Date()));
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));

  // week 달력 관련 핸들러
  const handleDateClick = (date: Date) => {
    setDate(date);
    setMondayOfWeek(getMondayDateOfWeek(date));
    setDateRange(getWeekRange(date));
  };

  return { handleDateClick, setDate, mondayOfWeek, dateRange, date };
};

export default useWeekRecord;
