import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { getWeekRange } from "../lib/formatDate";
import { DateValue, TileClassNameProps } from "../hooks/useWeekRecord";

dayjs.extend(weekOfYear);

type Props = {
  handleDateClick: (date: Date) => void;
  handleActiveStartDateChange: ({ action, activeStartDate, value, view }: any) => void;
  getTileClassName: ({ date, view }: TileClassNameProps) => string | null;
  setDate: React.Dispatch<React.SetStateAction<DateValue>>;
  date: DateValue;
};

export default function MyCalendar({ handleDateClick, handleActiveStartDateChange, getTileClassName, setDate, date }: Props) {
  return (
    <CalendarStyle
      onChange={setDate}
      onClickDay={handleDateClick}
      onActiveStartDateChange={handleActiveStartDateChange}
      value={date}
      tileClassName={getTileClassName}
      showWeekNumbers={true}
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
