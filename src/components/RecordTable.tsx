import styled from "styled-components";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";
import { formatCelebrate } from "../lib/formatRecord";
import Checkbox from "./Checkbox";

type Props = {
  records: WeeklyTeamRecords[];
  mode: string;
};

export default function RecordTable({ records, mode }: Props) {
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
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
              <tr key={record.id}>
                <td>{record.team}</td>
                <td>{record.content}</td>
                <td>{record.accSum}</td>
                <td>{record.remain}</td>
                <td>{record.remark}번째</td>
                <td>{formatCelebrate(record.celebrate)}</td>
                <td>
                  <Checkbox achieve={record.achieve} id={record.id} mode={mode} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </RecordTableStyle>
  );
}

const RecordTableStyle = styled.div`
  flex: 1;

  table {
    width: 100%;

    td {
      text-align: center;
    }
  }
`;
