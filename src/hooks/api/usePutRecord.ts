import { updateRecord } from "@/api/record.api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { IWeeklyTeamRecord } from "@/models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";

export const usePutRecord = (record: IWeeklyTeamRecord | IWeeklyPlayerRecord, target: "weekly" | "daily", mode: "team" | "player", options: UseMutationOptions) => {
  return useMutation({
    mutationFn: async () => updateRecord(record, target, mode),
    ...options,
  });
};
