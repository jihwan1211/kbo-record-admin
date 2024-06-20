import styled from "styled-components";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useWeekRecord from "../hooks/useWeekRecord";

export default function Weekly() {
  const { weeklyTeamRecords, handleDateClick, handleActiveStartDateChange, getTileClassName, setDate, date } = useWeekRecord();

  return (
    <WeeklyStyle>
      <RecordTable records={weeklyTeamRecords} mode="team" />
      <div>
        <MyCalendar handleDateClick={handleDateClick} handleActiveStartDateChange={handleActiveStartDateChange} getTileClassName={getTileClassName} setDate={setDate} date={date} />
      </div>
    </WeeklyStyle>
  );
}

const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
