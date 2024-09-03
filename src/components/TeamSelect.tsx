import { teamArr } from "../models/team";
import { TeamType } from "../models/team";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  team: TeamType;
  setTeam: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function lineupTeamArr(defaultTeam: TeamType) {
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

export default function TeamSelect({ team, setTeam, ...props }: Props) {
  return (
    <select value={team} onChange={setTeam} {...props}>
      {lineupTeamArr(team)}
    </select>
  );
}
