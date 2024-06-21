import styled from "styled-components";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useWeekRecord from "../hooks/useWeekRecord";
import RecordUtils from "../components/RecordUtils";

export default function Weekly() {
  const { weeklyTeamRecords, weekNum, handleDateClick, handleActiveStartDateChange, getTileClassName, setDate, date, copyPrevWeekToCurrent } = useWeekRecord();

  if (!weeklyTeamRecords) return null;

  return (
    <WeeklyStyle>
      <RecordTable records={weeklyTeamRecords} mode="team" />
      <div>
        <MyCalendar handleDateClick={handleDateClick} handleActiveStartDateChange={handleActiveStartDateChange} getTileClassName={getTileClassName} setDate={setDate} date={date} />
        <RecordUtils date={date} weekNum={weekNum} currentWeekData={weeklyTeamRecords} copyPrevWeekToCurrent={copyPrevWeekToCurrent} />
      </div>
    </WeeklyStyle>
  );
}

const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
