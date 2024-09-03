import { TeamType } from "./team";

export interface IWeeklyTeamRecord {
  id: number;
  team: TeamType;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  isCelebrated: boolean;
  isAchieved: boolean;
  createdAt: string;
  achievementDate: string | null;
}
