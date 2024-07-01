import styled from "styled-components";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useRecordDelete from "../hooks/useRecordDelete";
import RecordHeader from "../components/RecordHeader";
import useWeekCalendar from "../hooks/useWeekCalendar";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "@/lib/formatDate";
import useWeeklyTeamNotAchievedRecord from "@/hooks/useQuery/useWeeklyTeamNotAchievedRecord";

export default function WeeklyTeamNotAchieved() {
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyTeamNotAchievedRecord(mondayOfWeek);
  const { deleteTargets, setDeleteTargets, handleRecordDelete } = useRecordDelete({
    target: "weekly",
    mode: "team",
    queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
  });

  if (!data) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="미달성 팀 기록 관리" handleRecordDelete={handleRecordDelete} target="weekly">
          <RecordTable records={data} date={date as Date} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} target="weekly" />
        </RecordHeader>
      </div>
      <MyCalendar handleDateClick={handleDateClick} setDate={setDate} date={date} dateRange={dateRange} />
    </WeeklyStyle>
  );
}

export const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  .data {
    flex: 1;
  }

  .select-team {
    position: absolute;
    display: flex;
    gap: 10px;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;
