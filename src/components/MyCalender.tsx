import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { getWeekRange } from "../lib/formatDate";
import { DateValue } from "@/hooks/useWeekCalendar";
import { compareDate } from "../lib/formatDate";

dayjs.extend(weekOfYear);

type Props = {
  handleDateClick: (date: Date) => void;
  setDate: React.Dispatch<React.SetStateAction<DateValue>>;
  date: DateValue;
  dateRange: string[];
};

type TileClassNameProps = {
  date: Date;
  view: string;
};

export default function MyCalendar({ handleDateClick, setDate, date, dateRange }: Props) {
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
