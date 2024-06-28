import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewWeeklyPlayerRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { IWeeklyPlayerRecord } from "../models/WeeklyPlayerRecord";
import { TPlayer } from "../models/WeeklyPlayerRecord";

export type newPlayerRecord = {
  content: string;
  accSum: string;
  remain: string;
  remark: number;
  createdAt: string;
  achievementDate: string | null;
};

const useAddWeeklyPlayerRecord = () => {
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
    // console.log(name);
    // console.log(value);
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD");
    setNewRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(player);
  console.log(newRecord);
  console.log(celebrate);

  const { mutate } = useMutation({
    mutationFn: async () =>
      postNewWeeklyPlayerRecord({
        playerId: player?.id as number,
        ...newRecord,
        celebrate,
        achieve: false,
      }),
    onError: (error) => {
      console.log(error);
      addToast({ message: `${error}, 선수 기록 저장에 실패하였습니다.`, type: "error" });
    },
  });

  return { newRecord, handleNewRecordChange, celebrate, setCelebrate, player, setPlayer, mutate };
};

export default useAddWeeklyPlayerRecord;
