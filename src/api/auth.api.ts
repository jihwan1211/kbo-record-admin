import { httpClient } from "./http";
import { LoginType } from "@/pages/Login";

type LoginReponse = {
  token: string;
};

export const login = async (data: LoginType) => {
  const response = await httpClient.post<LoginReponse>("/api/admin/login", data);
  return response;
};

export const signUp = async (data: LoginType) => {
  const response = await httpClient.post("/api/admin/signup", data);
  return response;
};
