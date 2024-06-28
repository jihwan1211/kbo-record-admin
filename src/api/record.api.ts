import { httpClient } from "./http";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { TeamType } from "../models/team";
import { IWeeklyPlayerRecord } from "../models/WeeklyPlayerRecord";

export const getWeeklyTeamRecord = async (date: string, done: boolean) => {
  const response = await httpClient.get<IWeeklyTeamRecord[]>(`/api/admin/weekly/team?date=${date}&done=${done}`);
  return response.data;
};

export type UpdateWeeklyBooleanProps = {
  mode: string;
  id: number;
  flag: boolean;
};

export const updateWeeklyAchieve = async ({ mode, id, flag }: UpdateWeeklyBooleanProps) => {
  const response = await httpClient.put(`/api/admin/weekly/team/achieve?t=${mode}&id=${id}&achieve=${flag}`);
  return response;
};

export const updateWeeklyCelebrate = async ({ mode, id, flag }: UpdateWeeklyBooleanProps) => {
  const response = await httpClient.put(`/api/admin/weekly/team/celebrate?t=${mode}&id=${id}&celebrate=${flag}`);
  return response;
};

export const updateWeeklyRecord = async (data: IWeeklyTeamRecord | IWeeklyPlayerRecord, mode: "team" | "player") => {
  const response = await httpClient.put(`/api/admin/weekly?t=${mode}`, data);
  return response;
};

export const postNewWeeklyTeamRecord = async (data: Omit<IWeeklyTeamRecord, "id">) => {
  const response = await httpClient.post("/api/admin/weekly/team", data);
  return response;
};

export const deleteWeeklyTeamRecords = async (data: number[], mode: "team" | "player") => {
  const response = await httpClient.delete(`/api/admin/weekly?t=${mode}`, {
    data: {
      data: [...data],
    },
  });
  return response;
};

export const getWeeklyPlayerRecord = async (date: string, done: boolean, team: TeamType) => {
  const response = await httpClient.get<IWeeklyPlayerRecord[]>(`/api/admin/weekly/player/${team}?date=${date}&done=${done}`);
  return response.data;
};

export const postNewWeeklyPlayerRecord = async (data: Omit<IWeeklyPlayerRecord, "id">) => {
  const response = await httpClient.post("/api/admin/weekly/player", data);
  return response;
};
