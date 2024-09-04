import useWeeklyTeamAchievedRecord from "@/hooks/api/useWeeklyTeamAchievedRecord";
import { RecordTableStyle } from "./WeeklyTeamNotAchieved";
import RecordRow from "@components/RecordRow";

export default function WeeklyTeamAchieved() {
  const { data } = useWeeklyTeamAchievedRecord();
  const records = data ?? [];

  return (
    <RecordTableStyle>
      {records.length === 0 ? (
        <div>데이터가 없습니다</div>
      ) : (
        <table>
          <thead>
            <tr>
              <td>삭제</td>
              <td>팀명</td>
              <td>기록명</td>
              <td>누적기록</td>
              <td>잔여기록</td>
              <td>비고</td>
              <td>시상여부</td>
              <td>달성완료</td>
              <td>created_at</td>
              <td>달성날짜</td>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <RecordRow key={record.id} record={record} />
            ))}
          </tbody>
        </table>
      )}
    </RecordTableStyle>
  );
}
