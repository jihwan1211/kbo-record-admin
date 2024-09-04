import { useState, FormEventHandler, ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";
import { IWeeklyTeamRecord } from "../models/WeeklyTeamRecords";
import { usePostTeamRecord } from "./api/usePostTeamRecord";

const getDefaultCreatedAt = () => dayjs(getMondayDateOfWeek(new Date())).format("YYYY-MM-DD");

const useAddTeamRecord = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const [newRecord, setNewRecord] = useState<Omit<IWeeklyTeamRecord, "id" | "isAchieved" | "isCelebrated">>({
    team: "SSG",
    content: "",
    accSum: "",
    remain: "",
    remark: 1,
    createdAt: getDefaultCreatedAt(),
    achievementDate: null,
  });
  const [isCelebrated, setCelebrate] = useState(false);
  const { addToast } = useToastStore();

  const handleNewRecordChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRecord((prevState) => ({
      ...prevState,
      [name]: name === "remark" ? Number(value) : name === "createdAt" ? dayjs(getMondayDateOfWeek(new Date(value))).format("YYYY-MM-DD") : value,
    }));
  };

  const { mutate } = usePostTeamRecord(
    { ...newRecord, isCelebrated, isAchieved: false },
    {
      onSuccess: () => {
        addToast({ message: "팀 기록 저장에 성공하였습니다.", type: "info" });
        queryClient.invalidateQueries({ queryKey: ["weekly", "record", "team", getDefaultCreatedAt(), "NOT-ACHIEVED"] });
        onClose();
      },
      onError: (error) => {
        addToast({ message: `${error}, 팀 기록 저장에 실패하였습니다.`, type: "error" });
      },
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return { newRecord, handleNewRecordChange, isCelebrated, setCelebrate, handleSubmit };
};

export default useAddTeamRecord;
