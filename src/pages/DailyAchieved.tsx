import MyCalendar from "@components/MyCalender";
import useDailyCalendar from "@/hooks/useDailyCalendar";
import { WeeklyStyle } from "./WeeklyTeamNotAchieved";
import { useState } from "react";
import { TeamType } from "@/models/team";
import TeamSelect from "@components/TeamSelect";
import useRecordDelete from "@/hooks/useRecordDelete";
import dayjs from "dayjs";
import RecordHeader from "@components/RecordHeader";
import RecordTable from "@components/RecordTable";
import useDailyAchievedRecord from "@/hooks/useQuery/useDailyAchievedRecord";

export default function DailyAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { handleDateClick, setDate, date } = useDailyCalendar();
  const { data } = useDailyAchievedRecord(date as Date, team);
  const { deleteTargets, setDeleteTargets, handleRecordDelete } = useRecordDelete({
    target: "daily",
    queryKey: ["daily", "record", team, "player", dayjs(new Date()).format("YYYY-MM-DD"), "ACHIEVED"],
  });
  if (!data) return null;
  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="달성 개인 기록 관리" handleRecordDelete={handleRecordDelete} target="daily">
          <RecordTable records={data} date={date as Date} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} target="daily" />
        </RecordHeader>
      </div>
      <div className="select-team">
        <p>팀 선택 : </p>
        <TeamSelect team={team} setTeam={(e) => setTeam(e.target.value as TeamType)} />
      </div>
      <MyCalendar handleDateClick={handleDateClick} setDate={setDate} date={date} />
    </WeeklyStyle>
  );
}
