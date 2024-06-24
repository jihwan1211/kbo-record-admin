import styled from "styled-components";
import { useState } from "react";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";
import Checkbox from "./Checkbox";
import EditRecord from "./EditRecord";
import { teamArr } from "../models/team";
import { updateWeeklyRecordChange } from "../api/record.api";
import { updateWeeklyAchieve, updateWeeklyCelebrate } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

type Props = {
  record: WeeklyTeamRecords;
  mode: string;
  mondayOfWeek: Date;
};

function lineupTeamArr(defaultTeam: string) {
  const newTeamArr = teamArr.filter((team) => team !== defaultTeam);
  newTeamArr.unshift(defaultTeam);
  return newTeamArr.map((team) => {
    return (
      <option key={team} value={team}>
        {team}
      </option>
    );
  });
}

export default function RecordRow({ record, mode, mondayOfWeek }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [team, setTeam] = useState(record.team);
  const [content, setContent] = useState(record.content);
  const [accSum, setAccSum] = useState(record.accSum);
  const [remain, setRemain] = useState(record.remain);
  const [remark, setRemark] = useState(record.remark);
  const [celebrate, setCelebrate] = useState(record.celebrate);
  const [achieve, setAchieve] = useState(record.achieve);
  const [createdAt, setCreatedAt] = useState(record.createdAt);
  const [achievementDate, setAchievementDate] = useState(record.achievementDate);
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => updateWeeklyRecordChange({ id: record.id, team, content, accSum, remain, remark, celebrate, achieve, createdAt, achievementDate }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["weekly", "record", dayjs(mondayOfWeek).format("YYYY-MM-DD")] });
      addToast({ message: `${record.team} 기록 변경에 성공하였습니다.`, type: "info" });
      setIsEditing(false);
    },
    onError: (error) => {
      addToast({ message: `error : ${error} 기록 변경에 실패하였습니다.`, type: "error" });
    },
  });

  return (
    <RecordTrStyle key={record.id}>
      <td>
        {isEditing ? (
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            {lineupTeamArr(team)}
          </select>
        ) : (
          record.team
        )}
      </td>
      <td>{isEditing ? <input value={content} onChange={(e) => setContent(e.target.value)} /> : record.content}</td>
      <td>{isEditing ? <input value={accSum} onChange={(e) => setAccSum(e.target.value)} /> : record.accSum}</td>
      <td>{isEditing ? <input value={remain} onChange={(e) => setRemain(e.target.value)} /> : record.remain}</td>
      <td>{isEditing ? <input value={remark} onChange={(e) => setRemark(Number(e.target.value))} /> : `${record.remark}번째`}</td>
      <td>
        <Checkbox stateProps={record.celebrate} setState={setCelebrate} id={record.id} mode={mode} apiFunction={updateWeeklyCelebrate} />
      </td>
      <td>
        <Checkbox stateProps={record.achieve} setState={setAchieve} id={record.id} mode={mode} apiFunction={updateWeeklyAchieve} />
      </td>
      <td>{isEditing ? <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} /> : record.createdAt}</td>
      <EditRecord isEditing={isEditing} setIsEditing={setIsEditing} handleRecordChange={mutate} />
    </RecordTrStyle>
  );
}

const RecordTrStyle = styled.tr`
  input {
    width: 100%;
    text-align: center;
  }

  select {
    text-align: center;
  }
  ul {
    margin: 5px;
    padding: 0;
    list-style-type: none;
  }
`;
