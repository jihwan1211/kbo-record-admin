import { useState } from "react";
import { WeeklyStyle } from "./WeeklyTeamNotAchieved";
import RecordHeader from "../components/RecordHeader";
import MyCalendar from "../components/MyCalender";
import useWeekCalendar from "../hooks/useWeekCalendar";
import TeamSelect from "../components/TeamSelect";
import { TeamType } from "../models/team";
import useRecordDelete from "../hooks/useRecordDelete";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import RecordTable from "@components/RecordTable";
import useWeeklyPlayerAchievedRecord from "@/hooks/useQuery/useWeeklyPlayerAchievedRecord";

export default function WeeklyPlayerAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyPlayerAchievedRecord(mondayOfWeek, team);
  const { deleteTargets, setDeleteTargets, handleRecordDelete } = useRecordDelete({
    mode: "player",
    queryKey: ["weekly", "record", team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "ACHIEVED"],
  });

  if (!data) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="달성 개인 기록 관리" handleRecordDelete={handleRecordDelete}>
          <RecordTable records={data} mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
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
