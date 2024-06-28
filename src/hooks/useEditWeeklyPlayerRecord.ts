import { useState } from "react";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWeeklyRecordChange } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import useSideMenuStore from "../store/SideMenuStore";
import { WeeklyPlayerRecordTableProps } from "../components/WeekPlayerRecordTable";
import { TWeeklyPlayerRecord } from "../models/WeeklyPlayerRecord";
import { newPlayerRecord } from "./useAddWeeklyPlayerRecord";

const useEditWeeklyPlayerRecord = ({ record, mondayOfWeek, setDeleteTargets, deleteTargets }: Omit<WeeklyPlayerRecordTableProps, "records" | "mode"> & { record: TWeeklyPlayerRecord }) => {
  const queryClient = useQueryClient();
  const [player, setPlayer] = useState(null);
  const [recordState, setRecordState] = useState<newPlayerRecord>({
    content: record.content,
    accSum: record.accSum,
    remain: record.remain,
    remark: record.remark,
    createdAt: record.createdAt,
    achievementDate: null,
  });
  const [celebrate, setCelebrate] = useState(record.celebrate);
  const [achieve, setAchieve] = useState(record.achieve);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { addToast } = useToastStore();
  const { secondMenu } = useSideMenuStore();

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD");
    setRecordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteTarget = () => {
    setDeleteTargets((prev) => {
      if (prev.includes(record.id)) {
        return prev.filter((id) => id !== record.id);
      } else {
        return [...prev, record.id];
      }
    });
  };

  const isDeleteChecked = (id: number) => deleteTargets.includes(id);

  const invalidateQueries = () => {
    const queryKey = ["weekly", "record", "team", dayjs(mondayOfWeek).format("YYYY-MM-DD"), secondMenu === "DONE" ? "DONE" : "UNDONE"];
    queryClient.invalidateQueries({ queryKey });
  };

  const mutation = useMutation({
    mutationFn: async () => updateWeeklyRecordChange({ id: record.id, celebrate, achieve, ...recordState }),
    onSuccess: (response) => {
      invalidateQueries();
      addToast({ message: `${record.team} 기록 변경에 성공하였습니다.`, type: "info" });
      setIsEditing(false);
    },
    onError: (error) => {
      addToast({ message: `error : ${error} 기록 변경에 실패하였습니다.`, type: "error" });
    },
  });

  return { isEditing, recordState, celebrate, achieve, setCelebrate, setAchieve, handleInputChange, mutation, setIsEditing, handleDeleteTarget, isDeleteChecked };
};

export default useEditWeeklyPlayerRecord;
