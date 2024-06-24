import styled from "styled-components";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";
import RecordRow from "./RecordRow";

type Props = {
  records: WeeklyTeamRecords[];
  mode: string;
  mondayOfWeek: Date;
};

export default function RecordTable({ records, mode, mondayOfWeek }: Props) {
  return (
    <RecordTableStyle>
      <table>
        <thead>
          <tr>
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
        <tbody>{records && records.map((record) => <RecordRow key={record.id} record={record} mode={mode} mondayOfWeek={mondayOfWeek} />)}</tbody>
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
