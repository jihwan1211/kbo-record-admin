import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../api/record.api";
import { getWeekRange, getMondayDateOfWeek } from "../lib/formatDate";
import dayjs from "dayjs";

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const useWeekRecord = () => {
  // week 달력 관련 상태
  const [date, setDate] = useState<DateValue>(new Date());
  const [mondayOfWeek, setMondayOfWeek] = useState(() => getMondayDateOfWeek(new Date()));
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));

  const { data: undoneData } = useQuery({
    queryKey: ["weekly", "record", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "UNDONE"],
    queryFn: () => getWeeklyTeamRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD"), false),
  });

  const { data: doneData } = useQuery({
    queryKey: ["weekly", "record", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "DONE"],
    queryFn: () => getWeeklyTeamRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD"), true),
  });

  // week 달력 관련 핸들러
  const handleDateClick = (date: Date) => {
    setDate(date);
    setMondayOfWeek(getMondayDateOfWeek(date));
    setDateRange(getWeekRange(date));
  };

  return { weeklyUndoneTeamRecords: undoneData, weeklyDoneTeamRecords: doneData, handleDateClick, setDateRange, setDate, mondayOfWeek, dateRange, date };
};

export default useWeekRecord;
