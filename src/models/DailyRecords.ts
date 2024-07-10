import { TeamType } from "./team";
export interface IDailyPlayerRecord {
  id: number;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  celebrate: boolean;
  achieve: boolean;
  isFail: boolean;
  createdAt: string;
  achievementDate: string | null;
  playerId: number;
  player: string;
  team: TeamType;
  uniformNumber: number;
}
