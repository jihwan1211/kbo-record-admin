import styled from "styled-components";
import { AddRecordProps } from "./AddTeamRecord";
import { AddTeamRecordStyle } from "./AddTeamRecord";
import { useQueryClient } from "@tanstack/react-query";
import useToastStore from "../store/ToastStore";
import { FormEventHandler } from "react";
import useAddWeeklyPlayerRecord from "../hooks/useAddWeeklyPlayerRecord";
import PlayerSearch from "./PlayerSearch";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";

export default function AddPlayerRecord({ onClose }: AddRecordProps) {
  const queryClient = useQueryClient();
  // const { newRecord, handleNewRecordChange, celebrate, setCelebrate, mutate } = useAddTeamRecord();
  const { newRecord, handleNewRecordChange, celebrate, setCelebrate, player, setPlayer, mutate } = useAddWeeklyPlayerRecord();
  const { addToast } = useToastStore();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!player) addToast({ message: "선수를 선택하세요.", type: "error" });
    console.log(player?.team);
    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", player?.team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"] });
        onClose();
      },
    });
  };

  return (
    <AddTeamRecordStyle onSubmit={handleSubmit}>
      <ul>
        <li>
          <p>선수 검색</p>
          <PlayerSearch name="player" player={player} setPlayer={setPlayer} />
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

const AddPlayerRecordStyle = styled.div``;
