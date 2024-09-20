import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginType } from "@/pages/Login";
import { signUp } from "@/api/auth.api";
import { AxiosResponse } from "axios";

export const usePostSignUp = (options?: UseMutationOptions<AxiosResponse<any>, Error, LoginType>) => {
  return useMutation<AxiosResponse<any>, Error, LoginType>({
    mutationFn: async (data: LoginType) => signUp(data),
    ...options,
  });
};
