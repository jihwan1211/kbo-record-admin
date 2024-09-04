import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { TPlayer } from "../models/WeeklyPlayerRecord";
import { FormEventHandler } from "react";
import { useLocation } from "react-router-dom";
import { usePostPlayerRecord } from "./api/usePostPlayerRecord";
import { getFormattedDate } from "../lib/formatDate";

type Props = {
  onClose: () => void;
  target: "weekly" | "daily";
};

export type newPlayerRecord = {
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  createdAt: string;
  achievementDate: string | null;
};

const useAddPlayerRecord = ({ onClose, target }: Props) => {
  const queryClient = useQueryClient();
  const [newRecord, setNewRecord] = useState<newPlayerRecord>({
    content: "",
    accSum: "",
    remain: "",
    remark: 1,
    createdAt: getFormattedDate(target, new Date()),
    achievementDate: null,
  });
  const [player, setPlayer] = useState<TPlayer | null>(null);
  const [isCelebrated, setCelebrate] = useState(false);
  const { addToast } = useToastStore();
  const location = useLocation();

  const handleNewRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "remark" ? Number(value) : name === "createdAt" ? getFormattedDate(target, value) : value;

    setNewRecord((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const invalidateQueries = () => {
    let queryKey: string[] = [];
    if (target === "weekly") {
      queryKey = ["weekly", "record", player!.team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), location.pathname.includes("not-achieved") ? "NOT-ACHIEVED" : "ACHIEVED"];
    } else {
      queryKey = ["daily", "record", player!.team, "player", dayjs(new Date()).format("YYYY-MM-DD"), location.pathname.includes("not-achieved") ? "NOT-ACHIEVED" : "ACHIEVED"];
    }
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutate } = usePostPlayerRecord({ playerId: player?.id as number, ...newRecord, isCelebrated, isAchieved: false }, target, {
    onSuccess: () => {
      addToast({ message: "선수 기록 저장에 성공하였습니다.", type: "info" });
      invalidateQueries();
      onClose();
    },
    onError: (error) => {
      addToast({ message: `${error}, 선수 기록 저장에 실패하였습니다.`, type: "error" });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!player?.id) {
      addToast({ message: "선수를 선택하세요.", type: "error" });
      return;
    }

    mutate();
  };

  return { newRecord, handleNewRecordChange, isCelebrated, setCelebrate, player, setPlayer, mutate, handleSubmit };
};

export default useAddPlayerRecord;
