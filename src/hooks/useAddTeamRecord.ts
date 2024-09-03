import { useState, FormEventHandler } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewWeeklyTeamRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";

const useAddTeamRecord = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const [newRecord, setNewRecord] = useState<Omit<IWeeklyTeamRecord, "id" | "isAchieved" | "isCelebrated">>({
    team: "SSG",
    content: "",
    accSum: "",
    remain: "",
    remark: 1,
    createdAt: dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"),
    achievementDate: null,
  });
  const [isCelebrated, setCelebrate] = useState(false);
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
      postNewWeeklyTeamRecord({
        ...newRecord,
        isCelebrated,
        isAchieved: false,
      }),
    onError: (error) => {
      addToast({ message: `${error}, 팀 기록 저장에 실패하였습니다.`, type: "error" });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD"), "NOT-ACHIEVED"] });
        onClose();
      },
    });
  };

  return { newRecord, handleNewRecordChange, isCelebrated, setCelebrate, handleSubmit };
};

export default useAddTeamRecord;
