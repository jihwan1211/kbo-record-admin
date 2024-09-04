import { postNewWeeklyTeamRecord } from "@/api/record.api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { IWeeklyTeamRecord } from "@/models/WeeklyTeamRecords";

export const usePostTeamRecord = (record: Omit<IWeeklyTeamRecord, "id">, options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: async () => postNewWeeklyTeamRecord(record),
    ...options,
  });
};
