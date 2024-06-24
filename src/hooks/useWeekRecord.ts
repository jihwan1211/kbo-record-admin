import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../api/record.api";
import { getWeekRange, compareDate, getMondayDateOfWeek } from "../lib/formatDate";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export type TileClassNameProps = {
  date: Date;
  view: string;
};

const useWeekRecord = () => {
  const queryClient = useQueryClient();
  // week 달력 관련 상태
  const [date, setDate] = useState<DateValue>(new Date());
  const [mondayOfWeek, setMondayOfWeek] = useState(() => getMondayDateOfWeek(new Date()));
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));
  const [weekNum, setWeekNum] = useState<number>(() => dayjs(new Date()).week());

  const { data } = useQuery({
    queryKey: ["weekly", "record", dayjs(mondayOfWeek).format("YYYY-MM-DD")],
    queryFn: () => getWeeklyTeamRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD")),
  });

  // week 달력 관련 핸들러
  const handleDateClick = (date: Date) => {
    setDate(date);
    setMondayOfWeek(getMondayDateOfWeek(date));
    setWeekNum(dayjs(date as Date).week());
    setDateRange(getWeekRange(date));
  };

  const getTileClassName = ({ date, view }: TileClassNameProps): string | null => {
    if (view === "month") {
      const isInRange = compareDate(date, dateRange);
      return isInRange ? "highlight" : null;
    }
    return null;
  };

  const copyPrevWeekToCurrent = () => {
    const prevWeekData = queryClient.getQueryData<WeeklyTeamRecords[]>(["weekly", "record", dayjs(date as Date).year(), weekNum - 1]);
    console.log("usehook에서의 prevWeekdata: ", prevWeekData);
    const removeCompletedData = prevWeekData?.filter((record) => record.achieve === false);
    console.log("usehook에서의 removeCompletedData : ", removeCompletedData);
    queryClient.setQueryData(["weekly", "record", dayjs(date as Date).year(), weekNum], removeCompletedData);
  };

  return { weeklyTeamRecords: data, weekNum, getTileClassName, handleDateClick, setDateRange, setDate, mondayOfWeek, setWeekNum, dateRange, date, copyPrevWeekToCurrent };
};

export default useWeekRecord;
