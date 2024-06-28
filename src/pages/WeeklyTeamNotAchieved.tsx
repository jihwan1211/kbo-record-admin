import styled from "styled-components";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useSideMenuStore from "../store/SideMenuStore";
import useRecordDelete from "../hooks/useRecordDelete";
import { useAlert } from "../hooks/useAlert";
import useToastStore from "../store/ToastStore";
import RecordHeader from "../components/RecordHeader";
import useWeekCalendar from "../hooks/useWeekCalendar";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "@/lib/formatDate";
import useWeeklyTeamNotAchievedRecord from "@/hooks/useQuery/useWeeklyTeamNotAchievedRecord";

export default function WeeklyTeamNotAchieved() {
  const { handleDateClick, setDate, mondayOfWeek, dateRange, date } = useWeekCalendar();
  const { data } = useWeeklyTeamNotAchievedRecord(mondayOfWeek);
  const { deleteTargets, setDeleteTargets, mutation } = useRecordDelete({
    mode: "team",
    queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"],
  });
  const { secondMenu } = useSideMenuStore();
  const { showConfirm } = useAlert();
  const { addToast } = useToastStore();

  if (!data) return null;

  const handleRecordDelete = () => {
    if (deleteTargets.length) showConfirm("정말로 삭제하시겠습니까?", mutation.mutate);
    else {
      addToast({ message: "삭제할 기록을 선택하십시오", type: "error" });
    }
  };

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title="미달성 팀 기록 관리" handleRecordDelete={handleRecordDelete}>
          <RecordTable records={data} mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
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
