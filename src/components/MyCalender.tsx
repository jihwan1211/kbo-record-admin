import styled from "styled-components";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear"; // ES 2015
import { getWeekRange, compareDate } from "../lib/formatDate";
dayjs.extend(weekOfYear);

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

type TileClassNameProps = {
  date: Date;
  view: string;
};

export default function MyCalendar() {
  const [date, setDate] = useState<DateValue>(new Date());
  const [dateRange, setdateRange] = useState<string[]>(() => getWeekRange(new Date()));
  const [weekNum, setWeekNum] = useState<number>(() => dayjs(new Date()).week());

  const handleDateClick = (date: Date) => {
    setDate(date);
    setWeekNum(dayjs(date as Date).week());
    setdateRange(getWeekRange(date));
  };

  const handleActiveStartDateChange = ({ action, activeStartDate, value, view }: any) => {
    setWeekNum(dayjs(activeStartDate as Date).week());
    setdateRange(getWeekRange(activeStartDate));
    setDate(activeStartDate);
  };

  const getTileClassName = ({ date, view }: TileClassNameProps): string | null => {
    if (view === "month") {
      const isInRange = compareDate(date, dateRange);
      return isInRange ? "highlight" : null;
    }
    return null;
  };

  return (
    <CalendarStyle
      onChange={setDate}
      onClickDay={handleDateClick}
      onActiveStartDateChange={handleActiveStartDateChange}
      value={date}
      tileClassName={getTileClassName}
      maxDate={new Date(getWeekRange(new Date())[1])}
      formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
    />
  );
}

const CalendarStyle = styled(Calendar)`
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
