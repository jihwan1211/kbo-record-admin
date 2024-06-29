import styled from "styled-components";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";
import RecordRow from "./RecordRow";

export type WeekRecordTableProps = {
  records: IWeeklyTeamRecord[] | IWeeklyPlayerRecord[];
  mondayOfWeek: Date;
  setDeleteTargets: React.Dispatch<React.SetStateAction<number[]>>;
  deleteTargets: number[];
};

export default function RecordTable({ records, mondayOfWeek, deleteTargets, setDeleteTargets }: WeekRecordTableProps) {
  if (!records.length) return <p>저장된 기록이 없습니다.</p>;
  return (
    <RecordTableStyle>
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
            <td>달성여부</td>
            <td>created_at</td>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <RecordRow key={record.id} record={record} mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
          ))}
        </tbody>
      </table>
    </RecordTableStyle>
  );
}

const RecordTableStyle = styled.div`
  table {
    width: 100%;

    td {
      text-align: center;
    }
  }
`;
