import { AddRecordProps } from "./AddTeamRecord";
import { AddTeamRecordStyle } from "./AddTeamRecord";
import TeamSelect from "./TeamSelect";
import useAddPlayer from "@/hooks/useAddPlayer";

export default function AddPlayer({ onClose }: AddRecordProps) {
  const { player, handleNewPlayerChange, handleSubmit } = useAddPlayer({ onClose });

  return (
    <AddTeamRecordStyle onSubmit={handleSubmit}>
      <ul>
        <li>
          <p>팀 선택</p>
          <TeamSelect name="team" team={player.team} setTeam={(e) => handleNewPlayerChange(e)} />
        </li>
        <li>
          <p>선수이름</p>
          <input name="player" value={player.player} onChange={(e) => handleNewPlayerChange(e)} required />
        </li>
        <li>
          <p>등번호</p>
          <input name="uniformNumber" value={player.uniformNumber} onChange={(e) => handleNewPlayerChange(e)} required />
        </li>
      </ul>
      <button type="submit">등록</button>
    </AddTeamRecordStyle>
  );
}
