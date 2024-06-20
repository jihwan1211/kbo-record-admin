import { httpClient } from "./http";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

type WeeklyTeamReacordProps = {
  week: number;
  year: number;
};

export const getWeeklyTeamRecord = async ({ week, year }: WeeklyTeamReacordProps) => {
  const response = await httpClient.get<WeeklyTeamRecords[]>(`/api/weekly?year=${year}&week=${week}`);
  return response;
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
