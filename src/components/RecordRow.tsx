import styled from "styled-components";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";
import Checkbox from "./Checkbox";
import EditRecord from "./EditRecord";
import { updateWeeklyAchieve, updateWeeklyCelebrate } from "../api/record.api";
import TeamSelect from "./TeamSelect";
import { WeekRecordTableProps } from "./RecordTable";
import useEditWeeklyTeamRecord from "../hooks/useEditWeeklyTeamRecord";
import PlayerSearch from "./PlayerSearch";

export default function RecordRow({ record, mondayOfWeek, setDeleteTargets, deleteTargets }: Omit<WeekRecordTableProps, "records"> & { record: IWeeklyTeamRecord | IWeeklyPlayerRecord }) {
  const { player, setPlayer, isEditing, recordState, setCelebrate, setAchieve, handleInputChange, mutation, setIsEditing, handleDeleteTarget, isDeleteChecked } = useEditWeeklyTeamRecord({
    record,
    mondayOfWeek,
    setDeleteTargets,
    deleteTargets,
  });

  return (
    <RecordTrStyle key={record.id}>
      <td>
        <input type="checkbox" checked={isDeleteChecked(record.id)} onChange={handleDeleteTarget} />
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
        <Checkbox
          stateProps={record.celebrate}
          setState={setCelebrate}
          mondayOfWeek={mondayOfWeek}
          recordId={record.id}
          mode={"playerId" in record ? "player" : "team"}
          apiFunction={updateWeeklyCelebrate}
        />
      </td>
      <td>
        <Checkbox
          stateProps={record.achieve}
          setState={setAchieve}
          mondayOfWeek={mondayOfWeek}
          recordId={record.id}
          mode={"playerId" in record ? "player" : "team"}
          apiFunction={updateWeeklyAchieve}
        />
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
