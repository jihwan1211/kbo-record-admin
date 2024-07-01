import { DateValue } from "./useWeekCalendar";
import { useState } from "react";

export default function useDailyCalendar() {
  const [date, setDate] = useState<DateValue>(new Date());
  console.log(date);
  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  return { date, setDate, handleDateClick };
}
