import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useRecordDelete from "../hooks/useRecordDelete";
import RecordHeader from "../components/RecordHeader";
import useWeekCalendar from "../hooks/useWeekCalendar";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "@/lib/formatDate";
import useWeeklyTeamAchievedRecord from "@/hooks/useQuery/useWeeklyTeamAchievedRecord";
import { WeeklyStyle } from "./WeeklyTeamNotAchieved";

export default function WeeklyTeamAchieved() {
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyTeamAchievedRecord(mondayOfWeek);
  const { deleteTargets, setDeleteTargets, handleRecordDelete } = useRecordDelete({
    mode: "team",
    queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "ACHIEVED"],
  });

  if (!data) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="달성 팀 기록 관리" handleRecordDelete={handleRecordDelete}>
          <RecordTable records={data} mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
        </RecordHeader>
      </div>
      <MyCalendar handleDateClick={handleDateClick} setDate={setDate} date={date} dateRange={dateRange} />
    </WeeklyStyle>
  );
}
