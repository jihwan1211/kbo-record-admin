export interface WeeklyTeamRecord {
  id: number;
  team: string;
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  celebrate: boolean;
  achieve: boolean;
  createdAt: string;
  achievementDate: string | null;
}
