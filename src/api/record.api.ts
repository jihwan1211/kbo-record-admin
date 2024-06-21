import { httpClient } from "./http";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

type WeeklyTeamRecordProps = {
  year: number;
  week: number;
};

export const getWeeklyTeamRecord = async ({ year, week }: WeeklyTeamRecordProps) => {
  const response = await httpClient.get<WeeklyTeamRecords[]>(`/api/weekly?year=${year}&week=${week}`);
  return response.data;
};

type UpdateWeeklyAchieveProps = {
  mode: string;
  id: number;
  achieve: boolean;
};

export const updateWeeklyAchieve = async ({ mode, id, achieve }: UpdateWeeklyAchieveProps) => {
  const response = await httpClient.put(`/api/admin/weekly?t=${mode}&id=${id}&achieve=${achieve}`);
  return response;
};
