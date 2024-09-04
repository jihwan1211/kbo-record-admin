import { useState } from "react";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecord } from "@/api/record.api";
import useToastStore from "../store/ToastStore";
import { TPlayer } from "@/models/WeeklyPlayerRecord";
import { useLocation } from "react-router-dom";
import useDateStore from "@/store/DateStore";
import useTargetModeStore from "@/store/TargetModeStore";
import useDeleteRecordStore from "@/store/DeleteRecordStore";

type Props = {
  record: IWeeklyTeamRecord | IWeeklyPlayerRecord;
};

const useEditRecord = ({ record }: Props) => {
  const queryClient = useQueryClient();
  const { target, mode } = useTargetModeStore();
  const { date } = useDateStore();
  const { setDeleteTargets, deleteTargets } = useDeleteRecordStore();
  const [recordState, setRecordState] = useState<Omit<IWeeklyTeamRecord, "id" | "isAchieved" | "isCelebrated">>({ ...record });
  const [isCelebrated, setCelebrate] = useState(record.isCelebrated);
  const [isAchieved, setAchieve] = useState(record.isAchieved);
  console.log(recordState);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [player, setPlayer] = useState<TPlayer | null>(() => ("playerId" in record ? { id: record.playerId, player: record.player, team: record.team, uniformNumber: record.uniformNumber } : null));
  const { addToast } = useToastStore();
  const location = useLocation();

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;

    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = target === "weekly" ? dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD") : dayjs(value).format("YYYY-MM-DD");

    setRecordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isDeleteChecked = (id: number) => deleteTargets.includes(id);

  const invalidateQueries = () => {
    let queryKey: string[] = [];
    if (target === "weekly") {
      if (mode === "player")
        queryKey = ["weekly", "record", recordState.team, "player", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), location.pathname.includes("not-achieved") ? "NOT-ACHIEVED" : "ACHIEVED"];
      else queryKey = ["weekly", "record", "team", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), location.pathname.includes("not-achieved") ? "NOT-ACHIEVED" : "ACHIEVED"];
    } else {
      queryKey = ["daily", "record", recordState.team, "player", dayjs(date as Date).format("YYYY-MM-DD"), location.pathname.includes("not-achieved") ? "NOT-ACHIEVED" : "ACHIEVED"];
    }
    queryClient.invalidateQueries({ queryKey });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if ("playerId" in recordState) {
        const data: Omit<IWeeklyPlayerRecord, "player" | "uniformNumber" | "team"> = { id: record.id, isCelebrated, isAchieved, ...recordState, playerId: recordState.playerId as number };
        return updateRecord({ data, target, mode });
      } else {
        const data: IWeeklyTeamRecord = { id: record.id, isCelebrated, isAchieved, ...recordState };
        return updateRecord({ data, target, mode });
      }
    },
    onSuccess: (_response) => {
      invalidateQueries();
      addToast({ message: `${record.team} 기록 변경에 성공하였습니다.`, type: "info" });
      setIsEditing(false);
    },
    onError: (error) => {
      addToast({ message: `error : ${error} 기록 변경에 실패하였습니다.`, type: "error" });
    },
  });

  return { player, setPlayer, isEditing, recordState, isCelebrated, isAchieved, setCelebrate, setAchieve, handleInputChange, mutation, setIsEditing, setDeleteTargets, isDeleteChecked };
};

export default useEditRecord;
