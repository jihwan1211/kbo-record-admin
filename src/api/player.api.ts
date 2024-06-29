import { httpClient } from "./http";
import { TPlayer } from "@/models/WeeklyPlayerRecord";

export const searchPlayer = async (data: string) => {
  const response = await httpClient(`/api/players?q=${data}`);
  return response.data;
};

export const registerPlayer = async (data: Omit<TPlayer, "id">) => {
  const response = await httpClient.post(`/api/admin/player`, data);
  return response.data;
};
