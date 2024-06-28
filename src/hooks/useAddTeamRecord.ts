import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewWeeklyTeamRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { WeeklyTeamRecord } from "../models/WeeklyTeamRecords";

const useAddTeamRecord = () => {
  const [newRecord, setNewRecord] = useState<Omit<WeeklyTeamRecord, "id" | "achieve" | "celebrate">>({
    team: "SSG",
    content: "",
    accSum: "",
    remain: "",
    remark: 1,
    createdAt: dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"),
    achievementDate: null,
  });
  const [celebrate, setCelebrate] = useState(false);
  const { addToast } = useToastStore();

  const handleNewRecordChange = (e: any) => {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name == "remark") value = Number(value);
    else if (name == "createdAt") value = dayjs(getMondayDateOfWeek(value)).format("YYYY-MM-DD");
    setNewRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async () =>
      postNewWeeklyTeamRecord({
        ...newRecord,
        celebrate,
        achieve: false,
      }),
    onError: (error) => {
      console.log(error);
      addToast({ message: `${error}, 팀 기록 저장에 실패하였습니다.`, type: "error" });
    },
  });

  return { newRecord, handleNewRecordChange, celebrate, setCelebrate, mutate };
};

export default useAddTeamRecord;