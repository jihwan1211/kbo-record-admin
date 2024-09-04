import { postNewPlayerRecord } from "@/api/record.api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type PlayerRecordDto = {
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  createdAt: string;
  achievementDate: string | null;
  playerId: number;
  isCelebrated: boolean;
  isAchieved: boolean;
};

export const usePostPlayerRecord = (record: PlayerRecordDto, target: "weekly" | "daily", options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: async () => postNewPlayerRecord(record, target),
    ...options,
  });
};
