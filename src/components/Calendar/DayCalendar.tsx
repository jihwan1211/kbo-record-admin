import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { CalendarStyle } from "./WeekCalendar";
import { compareDate, getWeekRange } from "@/lib/formatDate";
import { DateValue } from "@/hooks/useWeekCalendar";
import useDateStore from "@/store/DateStore";

dayjs.extend(weekOfYear);

export default function DayCalendar() {
  const { date, setDate } = useDateStore();

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  //   const getTileClassName = ({ date, view }: TileClassNameProps): string | null => {
  //     if (dateRange && view === "month") {
  //       const isInRange = compareDate(date, dateRange);
  //       return isInRange ? "highlight" : null;
  //     }

  //     return null;
  //   };

  return (
    <CalendarStyle
      //   onChange={setDate}
      onClickDay={handleDateClick}
      value={date}
      //   tileClassName={getTileClassName}
      showWeekNumbers={true}
      maxDate={new Date(getWeekRange(new Date())[1])}
      formatDay={(_locale, date) => date.toLocaleString("en", { day: "numeric" })}
    />
  );
}
