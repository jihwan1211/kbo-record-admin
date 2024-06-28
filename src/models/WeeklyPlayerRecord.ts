import { TeamType } from "./team";

export interface IWeeklyPlayerRecord {
  id: number;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  celebrate: boolean;
  achieve: boolean;
  createdAt: string;
  achievementDate: string | null;
  playerId: number;
  player: string;
  team: TeamType;
  uniformNumber: number;
}

export type TPlayer = {
  id: number;
  player: string;
  team: TeamType;
  uniformNumber: number;
};
