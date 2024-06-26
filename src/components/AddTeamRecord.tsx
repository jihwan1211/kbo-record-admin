import styled from "styled-components";
import { FormEventHandler } from "react";
import TeamSelect from "./TeamSelect";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import useToastStore from "../store/ToastStore";
import useAddTeamRecord from "../hooks/useAddTeamRecord";
import { getMondayDateOfWeek } from "../lib/formatDate";

type Props = {
  onClose: () => void;
};

export default function AddTeamRecord({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { team, setTeam, content, setContent, accSum, setAccSum, remain, setRemain, remark, setRemark, celebrate, setCelebrate, createdAt, setCreatedAt, mutate } = useAddTeamRecord();
  const { addToast } = useToastStore();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"] });
        onClose();
      },
    });
  };

  return (
    <AddTeamRecordStyle onSubmit={handleSubmit}>
      <ul>
        <li>
          <p>팀 기록</p>
          <TeamSelect team={team} onChange={(e) => setTeam(e.target.value)} />
        </li>
        <li>
          <p>기록명</p>
          <input value={content} onChange={(e) => setContent(e.target.value)} required />
        </li>
        <li>
          <p>누적기록</p>
          <input value={accSum} onChange={(e) => setAccSum(e.target.value)} required />
        </li>
        <li>
          <p>잔여기록</p>
          <input value={remain} onChange={(e) => setRemain(e.target.value)} required />
        </li>
        <li>
          <p>몇 번째</p>
          <input value={remark} onChange={(e) => setRemark(Number(e.target.value))} required />
        </li>
        <li>
          <p>시상 여부</p>
          <input type="checkbox" checked={celebrate} onChange={() => setCelebrate(!celebrate)} />
        </li>
        <li>
          <p>날짜</p>
          <input type="date" value={createdAt} onChange={(e) => setCreatedAt(dayjs(e.target.value).format("YYYY-MM-DD"))} />
        </li>
      </ul>
      <button type="submit">등록</button>
    </AddTeamRecordStyle>
  );
}

const AddTeamRecordStyle = styled.form`
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
