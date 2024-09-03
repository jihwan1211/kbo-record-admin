import { AddTeamRecordStyle } from "./AddTeamRecord";
import useAddPlayerRecord from "../hooks/useAddPlayerRecord";
import PlayerSearch from "./PlayerSearch";
import useTargetModeStore from "@/store/TargetModeStore";

type Props = {
  onClose: () => void;
};

export default function AddPlayerRecord({ onClose }: Props) {
  const { target } = useTargetModeStore();
  const { newRecord, handleNewRecordChange, celebrate, setCelebrate, player, setPlayer, handleSubmit } = useAddPlayerRecord({ onClose, target });

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
