import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { CalendarStyle } from "./WeekCalendar";
import { getWeekRange } from "@/lib/formatDate";

import useDateStore from "@/store/DateStore";

dayjs.extend(weekOfYear);

export default function DayCalendar() {
  const { date, setDate } = useDateStore();

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  return (
    <CalendarStyle
      onClickDay={handleDateClick}
      value={date}
      showWeekNumbers={true}
      maxDate={new Date(getWeekRange(new Date())[1])}
      formatDay={(_locale, date) => date.toLocaleString("en", { day: "numeric" })}
    />
  );
}
