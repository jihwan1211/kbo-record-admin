import { useState } from "react";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { IWeeklyPlayerRecord } from "@/models/WeeklyPlayerRecord";
import dayjs from "dayjs";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecord } from "@/api/record.api";
import useToastStore from "../store/ToastStore";
import useSideMenuStore from "../store/SideMenuStore";
import { TPlayer } from "@/models/WeeklyPlayerRecord";

type Props = {
  record: IWeeklyTeamRecord | IWeeklyPlayerRecord;
  date: Date;
  setDeleteTargets: React.Dispatch<React.SetStateAction<number[]>>;
  deleteTargets: number[];
  target: "daily" | "weekly";
};

const useEditWeeklyTeamRecord = ({ record, date, setDeleteTargets, deleteTargets, target }: Props) => {
  const queryClient = useQueryClient();
  const [recordState, setRecordState] = useState<Omit<IWeeklyTeamRecord, "id" | "achieve" | "celebrate">>({ ...record });
  const [celebrate, setCelebrate] = useState(record.celebrate);
  const [achieve, setAchieve] = useState(record.achieve);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [player, setPlayer] = useState<TPlayer | null>(() => ("playerId" in record ? { id: record.playerId, player: record.player, team: record.team, uniformNumber: record.uniformNumber } : null));
  const { addToast } = useToastStore();
  const { secondMenu } = useSideMenuStore();

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = target === "weekly" ? dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD") : dayjs(value).format("YYYY-MM-DD");

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
    let queryKey: string[] = [];
    if (target === "weekly") {
      if ("playerId" in recordState)
        queryKey = ["weekly", "record", recordState.team, "player", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), secondMenu === "WEEKLY-PLAYER-ACHIEVED" ? "ACHIEVED" : "NOT-ACHIEVED"];
      else queryKey = ["weekly", "record", "team", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), secondMenu === "WEEKLY-TEAM-ACHIEVED" ? "ACHIEVED" : "NOT-ACHIEVED"];
    } else {
      queryKey = ["daily", "record", recordState.team, "player", dayjs(date).format("YYYY-MM-DD"), secondMenu === "DAILY-ACHIEVED" ? "ACHIEVED" : "NOT-ACHIEVED"];
    }
    queryClient.invalidateQueries({ queryKey });
  };

  const mutation = useMutation({
    mutationFn: async () => updateRecord({ id: record.id, celebrate, achieve, ...recordState, playerId: player?.id }, target, "playerId" in recordState ? "player" : "team"),
    onSuccess: (response) => {
      invalidateQueries();
      addToast({ message: `${record.team} 기록 변경에 성공하였습니다.`, type: "info" });
      setIsEditing(false);
    },
    onError: (error) => {
      addToast({ message: `error : ${error} 기록 변경에 실패하였습니다.`, type: "error" });
    },
  });

  return { player, setPlayer, isEditing, recordState, celebrate, achieve, setCelebrate, setAchieve, handleInputChange, mutation, setIsEditing, handleDeleteTarget, isDeleteChecked };
};

export default useEditWeeklyTeamRecord;
