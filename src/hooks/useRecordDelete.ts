import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteWeeklyTeamRecords } from "../api/record.api";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import useToastStore from "../store/ToastStore";

const useRecordDelete = () => {
  const queryClient = useQueryClient();
  const [deleteTargets, setDeleteTargets] = useState<number[]>([]);
  const { addToast } = useToastStore();

  const mutation = useMutation({
    mutationFn: async () => deleteWeeklyTeamRecords(deleteTargets, "team"),
    onSuccess: () => {
      addToast({ message: "팀 기록 삭제에 성공하였습니다.", type: "info" });
      queryClient.invalidateQueries({ queryKey: ["weekly", "record", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "UNDONE"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deleteTargets, setDeleteTargets, mutation };
};

export default useRecordDelete;
