import styled from "styled-components";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";
import Checkbox from "./Checkbox";
import EditRecord from "./EditRecord";
import { updateAchieve, updateCelebrate } from "@/api/record.api";
import TeamSelect from "./TeamSelect";
import useEditRecord from "../hooks/useEditRecord";
import PlayerSearch from "./PlayerSearch";

type Props = {
  record: IWeeklyTeamRecord | IWeeklyPlayerRecord;
};

export default function RecordRow({ record }: Props) {
  const { player, setPlayer, isEditing, recordState, setCelebrate, setAchieve, handleInputChange, mutation, setIsEditing, setDeleteTargets, isDeleteChecked } = useEditRecord({
    record,
  });

  return (
    <RecordTrStyle key={record.id}>
      <td>
        <input type="checkbox" checked={isDeleteChecked(record.id)} onChange={() => setDeleteTargets(record.id)} />
      </td>
      <td>
        {isEditing ? (
          "playerId" in record ? (
            <PlayerSearch player={player} setPlayer={setPlayer} />
          ) : (
            <TeamSelect name="team" team={recordState.team} setTeam={(e) => handleInputChange(e)} />
          )
        ) : "playerId" in record ? (
          record.player
        ) : (
          record.team
        )}
      </td>
      <td>{isEditing ? <input name="content" value={recordState.content} onChange={(e) => handleInputChange(e)} /> : record.content}</td>
      <td>{isEditing ? <input name="accSum" value={recordState.accSum} onChange={(e) => handleInputChange(e)} /> : record.accSum}</td>
      <td>{isEditing ? <input name="remain" value={recordState.remain} onChange={(e) => handleInputChange(e)} /> : record.remain}</td>
      <td>{isEditing ? <input name="remark" value={recordState.remark} onChange={(e) => handleInputChange(e)} /> : `${record.remark}번째`}</td>
      <td>
        <Checkbox stateProps={record.isCelebrated} setState={setCelebrate} recordId={record.id} mode={"playerId" in record ? "player" : "team"} apiFunction={updateCelebrate} />
      </td>
      <td>
        <Checkbox stateProps={record.isAchieved} setState={setAchieve} recordId={record.id} mode={"playerId" in record ? "player" : "team"} apiFunction={updateAchieve} />
      </td>
      <td>{isEditing ? <input type="date" name="createdAt" value={recordState.createdAt} onChange={(e) => handleInputChange(e)} /> : record.createdAt}</td>
      <EditRecord isEditing={isEditing} setIsEditing={setIsEditing} handleRecordChange={mutation.mutate} />
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
