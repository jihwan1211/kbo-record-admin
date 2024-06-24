import styled from "styled-components";
import { teamArr } from "../models/team";

type Props = {
  team: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

export default function TeamSelect({ team, onChange }: Props) {
  return (
    <TeamSelectStyle>
      <select value={team} onChange={onChange}>
        {lineupTeamArr(team)}
      </select>
    </TeamSelectStyle>
  );
}

const TeamSelectStyle = styled.div``;
