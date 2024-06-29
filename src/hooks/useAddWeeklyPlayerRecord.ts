import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewWeeklyPlayerRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { TPlayer } from "../models/WeeklyPlayerRecord";
import { FormEventHandler } from "react";

type Props = {
  onClose: () => void;
};

export type newPlayerRecord = {
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  createdAt: string;
  achievementDate: string | null;
};

const useAddWeeklyPlayerRecord = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const [newRecord, setNewRecord] = useState<newPlayerRecord>({
    content: "",
    accSum: "",
    remain: "",
    remark: 1,
    createdAt: dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"),
    achievementDate: null,
  });
  const [player, setPlayer] = useState<TPlayer | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const { addToast } = useToastStore();

  const handleNewRecordChange = (e: any) => {
    let { name, value } = e.target;
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD");
    setNewRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async () =>
      postNewWeeklyPlayerRecord({
        playerId: player?.id as number,
        ...newRecord,
        celebrate,
        achieve: false,
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
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", player?.team, "player", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "NOT-ACHIEVED"] });
        onClose();
      },
    });
  };

  return { newRecord, handleNewRecordChange, celebrate, setCelebrate, player, setPlayer, mutate, handleSubmit };
};

export default useAddWeeklyPlayerRecord;
