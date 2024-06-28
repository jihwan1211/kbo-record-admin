import { httpClient } from "./http";

export const searchPlayer = async (data: string) => {
  const response = await httpClient(`/api/players?q=${data}`);
  return response.data;
};
