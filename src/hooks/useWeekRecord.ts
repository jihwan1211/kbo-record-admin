import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../api/record.api";
import { getWeekRange, compareDate } from "../lib/formatDate";
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
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));
  const [weekNum, setWeekNum] = useState<number>(() => dayjs(new Date()).week());

  const { data } = useQuery({
    queryKey: ["weekly", "record", dayjs(date as Date).year(), weekNum],
    queryFn: () => getWeeklyTeamRecord({ year: dayjs(date as Date).year(), week: weekNum }),
  });

  // week 달력 관련 핸들러
  const handleDateClick = (date: Date) => {
    setDate(date);
    setWeekNum(dayjs(date as Date).week());
    setDateRange(getWeekRange(date));
  };

  const handleActiveStartDateChange = ({ action, activeStartDate, value, view }: any) => {
    setWeekNum(dayjs(activeStartDate as Date).week());
    setDateRange(getWeekRange(activeStartDate));
    setDate(activeStartDate);
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

  return { weeklyTeamRecords: data, weekNum, getTileClassName, handleActiveStartDateChange, handleDateClick, setDateRange, setDate, setWeekNum, dateRange, date, copyPrevWeekToCurrent };
};

export default useWeekRecord;
