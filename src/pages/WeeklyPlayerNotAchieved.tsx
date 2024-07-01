import { useState } from "react";
import RecordHeader from "../components/RecordHeader";
import MyCalendar from "../components/MyCalender";
import useWeekCalendar from "../hooks/useWeekCalendar";
import TeamSelect from "../components/TeamSelect";
import { TeamType } from "../models/team";
import useRecordDelete from "../hooks/useRecordDelete";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import RecordTable from "@components/RecordTable";
import useWeeklyPlayerNotAchievedRecord from "@/hooks/useQuery/useWeeklyPlayerNotAchievedRecord";
import { WeeklyStyle } from "./WeeklyTeamNotAchieved";

export default function WeeklyPlayerNotAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyPlayerNotAchievedRecord(mondayOfWeek, team);
  const { deleteTargets, setDeleteTargets, handleRecordDelete } = useRecordDelete({
    target: "weekly",
    mode: "player",
    queryKey: ["weekly", "record", team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
  });

  if (!data) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="미달성 개인 기록 관리" handleRecordDelete={handleRecordDelete} target="weekly">
          <RecordTable records={data} date={date as Date} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} target="weekly" />
        </RecordHeader>
      </div>
      <div className="select-team">
        <p>팀 선택 : </p>
        <TeamSelect team={team} setTeam={(e) => setTeam(e.target.value as TeamType)} />
      </div>
      <MyCalendar handleDateClick={handleDateClick} setDate={setDate} date={date} dateRange={dateRange} />
    </WeeklyStyle>
  );
}
