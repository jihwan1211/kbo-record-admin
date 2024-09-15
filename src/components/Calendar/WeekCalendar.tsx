import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
// import { compareDate, getMondayDateOfWeek, getWeekRange } from "@/lib/formatDate";
import { compareDate, getWeekRange } from "@/lib/formatDate";
import useDateStore from "@/store/DateStore";

dayjs.extend(weekOfYear);

type TileClassNameProps = {
  date: Date;
  view: string;
};

export default function WeekCalendar() {
  // week 달력 관련 상태
  const { date, setDate } = useDateStore();
  // const [mondayOfWeek, setMondayOfWeek] = useState(() => getMondayDateOfWeek(new Date()));
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));

  // week 달력 관련 핸들러
  const handleDateClick = (date: Date) => {
    setDate(date);
    // setMondayOfWeek(getMondayDateOfWeek(date));
    setDateRange(getWeekRange(date));
  };

  const getTileClassName = ({ date, view }: TileClassNameProps): string | null => {
    if (dateRange && view === "month") {
      const isInRange = compareDate(date, dateRange);
      return isInRange ? "highlight" : null;
    }

    return null;
  };

  return (
    <CalendarStyle
      onClickDay={handleDateClick}
      value={date}
      tileClassName={getTileClassName}
      showWeekNumbers={true}
      maxDate={new Date(getWeekRange(new Date())[1])}
      formatDay={(_locale, date) => date.toLocaleString("en", { day: "numeric" })}
    />
  );
}

export const CalendarStyle = styled(Calendar)`
  .react-calendar__tile--active {
    background-color: #90ee90;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #90ee90;
  }
  .highlight {
    background-color: #90ee90;
    color: white;
  }
`;
