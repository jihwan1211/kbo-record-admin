import styled from "styled-components";
import useWeeklyTeamNotAchievedRecord from "@/hooks/useQuery/useWeeklyTeamNotAchievedRecord";
import RecordRow from "@components/RecordRow";

export default function WeeklyTeamNotAchieved() {
  const { data } = useWeeklyTeamNotAchievedRecord();
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

export const RecordTableStyle = styled.div`
  table {
    width: 100%;

    td {
      text-align: center;
    }
  }
`;
