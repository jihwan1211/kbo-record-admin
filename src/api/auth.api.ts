import { httpClient } from "./http";

type LoginReponse = {
  token: string;
};

export const login = async (data: any) => {
  const response = await httpClient.post<LoginReponse>("/api/admin/login", data);
  return response;
};
