import { httpClient } from "./http";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

export const getWeeklyTeamRecord = async (date: string) => {
  const response = await httpClient.get<WeeklyTeamRecords[]>(`/api/weekly?date=${date}`);
  return response.data;
};

export type UpdateWeeklyBooleanProps = {
  mode: string;
  id: number;
  flag: boolean;
};

export const updateWeeklyAchieve = async ({ mode, id, flag }: UpdateWeeklyBooleanProps) => {
  const response = await httpClient.put(`/api/admin/weekly/achieve?t=${mode}&id=${id}&achieve=${flag}`);
  return response;
};

export const updateWeeklyCelebrate = async ({ mode, id, flag }: UpdateWeeklyBooleanProps) => {
  const response = await httpClient.put(`/api/admin/weekly/celebrate?t=${mode}&id=${id}&celebrate=${flag}`);
  return response;
};

export const updateWeeklyRecordChange = async (data: WeeklyTeamRecords) => {
  const response = await httpClient.put("/api/admin/weekly", data);
  return response;
};
