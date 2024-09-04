import { useState } from "react";
import styled from "styled-components";
import TeamSelect from "../components/TeamSelect";
import { TeamType } from "../models/team";
import useWeeklyPlayerNotAchievedRecord from "@/hooks/api/useWeeklyPlayerNotAchievedRecord";
import { RecordTableStyle } from "./WeeklyTeamNotAchieved";
import RecordRow from "@components/RecordRow";

export default function WeeklyPlayerNotAchieved() {
  const [team, setTeam] = useState<TeamType>("SSG");
  const { data } = useWeeklyPlayerNotAchievedRecord(team);
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
    </>
  );
}

export const StyledTeamSelect = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  gap: 10px;
  p {
    margin: 0;
    padding: 0;
  }
`;
