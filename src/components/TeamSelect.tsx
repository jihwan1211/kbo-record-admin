import styled from "styled-components";
import { teamArr } from "../models/team";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  team: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

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

export default function TeamSelect({ team, onChange, ...props }: Props) {
  return (
    <select value={team} onChange={onChange} {...props}>
      {lineupTeamArr(team)}
    </select>
  );
}
