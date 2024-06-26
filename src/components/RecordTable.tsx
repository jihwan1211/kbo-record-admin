import styled from "styled-components";
import { WeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import RecordRow from "./RecordRow";

export type WeekTeamRecordTableProps = {
  records: WeeklyTeamRecord[];
  mode: string;
  mondayOfWeek: Date;
  setDeleteTargets: React.Dispatch<React.SetStateAction<number[]>>;
  deleteTargets: number[];
};

export default function RecordTable({ records, mode, mondayOfWeek, deleteTargets, setDeleteTargets }: WeekTeamRecordTableProps) {
  return (
    <RecordTableStyle>
      <table>
        <thead>
          <tr>
            <td>삭제</td>
            <td>팀</td>
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
            <RecordRow key={record.id} record={record} mode={mode} mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
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
