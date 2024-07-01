import { httpClient } from "./http";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { TeamType } from "../models/team";
import { IWeeklyPlayerRecord } from "../models/WeeklyPlayerRecord";

export const getWeeklyTeamRecord = async (date: string, done: boolean) => {
  const response = await httpClient.get<IWeeklyTeamRecord[]>(`/api/admin/weekly/team?date=${date}&done=${done}`);
  return response.data;
};

export type UpdateWeeklyBooleanProps = {
  mode?: "team" | "player";
  target: "weekly" | "daily";
  id: number;
  flag: boolean;
};

export const updateAchieve = async ({ mode, id, target, flag }: UpdateWeeklyBooleanProps) => {
  const url = `/api/admin/record/achieve?id=${id}&achieve=${flag}&t=${target}${mode ? `&m=${mode}` : ""}`;
  const response = await httpClient.put(url);
  return response;
};

export const updateCelebrate = async ({ mode, id, target, flag }: UpdateWeeklyBooleanProps) => {
  const url = `/api/admin/record/celebrate?id=${id}&celebrate=${flag}&t=${target}${mode ? `&m=${mode}` : ""}`;
  const response = await httpClient.put(url);
  return response;
};

export const updateRecord = async (data: IWeeklyTeamRecord | IWeeklyPlayerRecord, target: "weekly" | "daily", mode?: "team" | "player") => {
  const url = `/api/admin/record?t=${target}${mode ? `&m=${mode}` : ""}`;
  const response = await httpClient.put(url, data);
  return response;
};

export const postNewWeeklyTeamRecord = async (data: Omit<IWeeklyTeamRecord, "id">) => {
  const response = await httpClient.post("/api/admin/weekly/team", data);
  return response;
};

export const deleteRecords = async (data: number[], target: "weekly" | "daily", mode?: "team" | "player") => {
  const url = `/api/admin/record?t=${target}${mode ? `&m=${mode}` : ""}`;

  const response = await httpClient.delete(url, {
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

export const postNewPlayerRecord = async (data: Omit<IWeeklyPlayerRecord, "id" | "player" | "uniformNumber" | "team">, target: "weekly" | "daily") => {
  const response = await httpClient.post(`/api/admin/player/record?t=${target}`, data);
  return response;
};

export const getDailyRecords = async (date: string, done: boolean, team: TeamType) => {
  const response = await httpClient.get<IWeeklyPlayerRecord[]>(`/api/admin/daily/${team}?date=${date}&done=${done}`);
  return response.data;
};
