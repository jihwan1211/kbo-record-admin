import styled from "styled-components";
import { FormEventHandler } from "react";
import TeamSelect from "./TeamSelect";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import useToastStore from "../store/ToastStore";
import useAddTeamRecord from "../hooks/useAddTeamRecord";
import { getMondayDateOfWeek } from "../lib/formatDate";

export type AddRecordProps = {
  onClose: () => void;
};

export default function AddTeamRecord({ onClose }: AddRecordProps) {
  const queryClient = useQueryClient();
  const { newRecord, handleNewRecordChange, celebrate, setCelebrate, mutate } = useAddTeamRecord();
  const { addToast } = useToastStore();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"] });
        onClose();
      },
    });
  };

  return (
    <AddTeamRecordStyle onSubmit={handleSubmit}>
      <ul>
        <li>
          <p>팀 기록</p>
          <TeamSelect name="team" team={newRecord.team} setTeam={(e) => handleNewRecordChange(e)} />
        </li>
        <li>
          <p>기록명</p>
          <input name="content" value={newRecord.content} onChange={(e) => handleNewRecordChange(e)} required />
        </li>
        <li>
          <p>누적기록</p>
          <input name="accSum" value={newRecord.accSum} onChange={(e) => handleNewRecordChange(e)} required />
        </li>
        <li>
          <p>잔여기록</p>
          <input name="remain" value={newRecord.remain} onChange={(e) => handleNewRecordChange(e)} required />
        </li>
        <li>
          <p>몇 번째</p>
          <input name="remark" value={newRecord.remark} onChange={(e) => handleNewRecordChange(e)} required />
        </li>
        <li>
          <p>시상 여부</p>
          <input type="checkbox" checked={celebrate} onChange={() => setCelebrate(!celebrate)} />
        </li>
        <li>
          <p>날짜</p>
          <input name="createdAt" type="date" value={newRecord.createdAt} onChange={(e) => handleNewRecordChange(e)} />
        </li>
      </ul>
      <button type="submit">등록</button>
    </AddTeamRecordStyle>
  );
}

export const AddTeamRecordStyle = styled.form`
  width: 300px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    p {
      margin: 5px 0;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;