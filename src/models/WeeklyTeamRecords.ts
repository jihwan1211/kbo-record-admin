import { TeamType } from "./team";

export interface IWeeklyTeamRecord {
  id: number;
  team: TeamType;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  celebrate: boolean;
  achieve: boolean;
  createdAt: string;
  achievementDate: string | null;
}
