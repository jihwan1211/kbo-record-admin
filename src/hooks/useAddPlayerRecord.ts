import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewPlayerRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { TPlayer } from "../models/WeeklyPlayerRecord";
import { FormEventHandler } from "react";
import { useLocation } from "react-router-dom";

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
    createdAt: target === "weekly" ? dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD") : dayjs(new Date()).format("YYYY-MM-DD"),
    achievementDate: null,
  });
  const [player, setPlayer] = useState<TPlayer | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const { addToast } = useToastStore();
  const location = useLocation();

  const handleNewRecordChange = (e: any) => {
    let { name, value } = e.target;
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = target === "weekly" ? dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD") : dayjs(value).format("YYYY-MM-DD");

    setNewRecord((prevState) => ({
      ...prevState,
      [name]: value,
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

  const { mutate } = useMutation({
    mutationFn: async () =>
      postNewPlayerRecord({
        data: {
          playerId: player?.id as number,
          ...newRecord,
          celebrate,
          achieve: false,
          isFail: false,
        },
        target,
      }),
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

    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "선수 기록 저장에 성공하였습니다.", type: "info" });
        invalidateQueries();
        onClose();
      },
    });
  };

  return { newRecord, handleNewRecordChange, celebrate, setCelebrate, player, setPlayer, mutate, handleSubmit };
};

export default useAddPlayerRecord;
