import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteWeeklyTeamRecords } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { useAlert } from "@/hooks/useAlert";

type Props = {
  mode: "team" | "player";
  queryKey: string[];
};

const useRecordDelete = ({ mode, queryKey }: Props) => {
  const queryClient = useQueryClient();
  const [deleteTargets, setDeleteTargets] = useState<number[]>([]);
  const { addToast } = useToastStore();
  const { showConfirm } = useAlert();

  const mutation = useMutation({
    mutationFn: async () => deleteWeeklyTeamRecords(deleteTargets, mode),
    onSuccess: () => {
      addToast({ message: "선수 개인 기록 삭제에 성공하였습니다.", type: "info" });
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRecordDelete = () => {
    if (deleteTargets.length) showConfirm("정말로 삭제하시겠습니까?", mutation.mutate);
    else {
      addToast({ message: "삭제할 기록을 선택하십시오", type: "error" });
    }
  };

  return { deleteTargets, setDeleteTargets, mutation, handleRecordDelete };
};

export default useRecordDelete;
