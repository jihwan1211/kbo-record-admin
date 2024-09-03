import { TeamType } from "./team";

export interface IWeeklyPlayerRecord {
  id: number;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  isCelebrated: boolean;
  isAchieved: boolean;
  createdAt: string;
  achievementDate: string | null;
  playerId: number;
  player: string;
  team: TeamType;
  uniformNumber: string;
}

export type TPlayer = {
  id: number;
  player: string;
  team: TeamType;
  uniformNumber: string;
};
