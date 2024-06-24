import styled from "styled-components";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useWeekRecord from "../hooks/useWeekRecord";
import RecordUtils from "../components/RecordUtils";

export default function Weekly() {
  const { weeklyTeamRecords, weekNum, handleDateClick, mondayOfWeek, getTileClassName, setDate, date, copyPrevWeekToCurrent } = useWeekRecord();

  if (!weeklyTeamRecords) return null;

  return (
    <WeeklyStyle>
      <RecordTable records={weeklyTeamRecords} mode="team" mondayOfWeek={mondayOfWeek} />
      <div>
        <MyCalendar handleDateClick={handleDateClick} getTileClassName={getTileClassName} setDate={setDate} date={date} />
        <RecordUtils date={date} weekNum={weekNum} currentWeekData={weeklyTeamRecords} copyPrevWeekToCurrent={copyPrevWeekToCurrent} />
      </div>
    </WeeklyStyle>
  );
}

const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
