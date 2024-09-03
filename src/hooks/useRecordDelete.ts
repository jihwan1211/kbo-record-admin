import { useMutation } from "@tanstack/react-query";
import { deleteRecords } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { useAlert } from "@/hooks/useAlert";
import useTargetModeStore from "@/store/TargetModeStore";
import useDeleteRecordStore from "@/store/DeleteRecordStore";

const useRecordDelete = () => {
  const { target, mode } = useTargetModeStore();
  const { deleteTargets } = useDeleteRecordStore();
  const { addToast } = useToastStore();
  const { showConfirm } = useAlert();

  const mutation = useMutation({
    mutationFn: async () => deleteRecords({ data: deleteTargets, target, mode }),
    onSuccess: () => {
      addToast({ message: "기록 삭제에 성공하였습니다.", type: "info" });
    },
    onError: (error) => {
      addToast({ message: "기록 삭제에 실패하였습니다.", type: "error" });
      console.log(error);
    },
  });

  const handleRecordDelete = () => {
    if (deleteTargets.length) showConfirm("정말로 삭제하시겠습니까?", mutation.mutate);
    else {
      addToast({ message: "삭제할 기록을 선택하십시오", type: "error" });
    }
  };

  return { deleteTargets, mutation, handleRecordDelete };
};

export default useRecordDelete;
