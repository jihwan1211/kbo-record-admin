import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { registerPlayer } from "@/api/player.api";
import { TPlayer } from "@/models/WeeklyPlayerRecord";

export function usePostPlayer(player: Omit<TPlayer, "id">, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: async () => registerPlayer({ ...player }),
    ...options,
  });
}
