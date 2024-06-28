import styled from "styled-components";
import { useState } from "react";
import useSideMenuStore from "../store/SideMenuStore";
import RecordHeader from "../components/RecordHeader";
import MyCalendar from "../components/MyCalender";
import useWeekCalendar from "../hooks/useWeekCalendar";
import TeamSelect from "../components/TeamSelect";
import { TeamType } from "../models/team";
import useRecordDelete from "../hooks/useRecordDelete";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { useAlert } from "../hooks/useAlert";
import useToastStore from "../store/ToastStore";
import RecordTable from "@components/RecordTable";
import useWeeklyPlayerNotAchievedRecord from "@/hooks/useQuery/useWeeklyPlayerNotAchievedRecord";
import { WeeklyStyle } from "./WeeklyTeamNotAchieved";

export default function WeeklyPlayerNotAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyPlayerNotAchievedRecord(mondayOfWeek, team);
  const { deleteTargets, setDeleteTargets, mutation } = useRecordDelete({
    mode: "team",
    queryKey: ["weekly", "record", team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"],
  });
  const { secondMenu } = useSideMenuStore();
  const { showConfirm } = useAlert();
  const { addToast } = useToastStore();
  console.log(team);

  const handleRecordDelete = () => {
    if (deleteTargets.length) showConfirm("정말로 삭제하시겠습니까?", mutation.mutate);
    else {
      addToast({ message: "삭제할 기록을 선택하십시오", type: "error" });
    }
  };

  if (!data) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="미달성 개인 기록 관리" handleRecordDelete={handleRecordDelete}>
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
