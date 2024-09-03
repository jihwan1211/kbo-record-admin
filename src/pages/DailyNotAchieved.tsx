import { RecordTableStyle } from "./WeeklyTeamNotAchieved";
import { useState } from "react";
import { TeamType } from "@/models/team";
import TeamSelect from "@components/TeamSelect";
import useDailyNotAchievedRecord from "@/hooks/useQuery/useDailyNotAchievedRecord";
import { StyledTeamSelect } from "./WeeklyPlayerNotAchieved";
import RecordRow from "@components/RecordRow";

export default function DailyNotAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { data } = useDailyNotAchievedRecord(team);
  const records = data ?? [];
  return (
    <>
      <StyledTeamSelect>
        <p>팀 선택 : </p>
        <TeamSelect team={team} setTeam={(e) => setTeam(e.target.value as TeamType)} />
      </StyledTeamSelect>
      <RecordTableStyle>
        {records.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          <table>
            <thead>
              <tr>
                <td>삭제</td>
                {"playerId" in records[0] ? <td>선수</td> : <td>팀명</td>}
                <td>기록명</td>
                <td>누적기록</td>
                <td>잔여기록</td>
                <td>비고</td>
                <td>시상여부</td>
                <td>달성완료</td>
                <td>created_at</td>
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
    </>
  );
}
