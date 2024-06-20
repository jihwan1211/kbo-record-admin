import { useState, useEffect } from "react";
import { getWeeklyTeamRecord, updateWeeklyAchieve } from "../api/record.api";
import { getWeekRange, compareDate } from "../lib/formatDate";
import dayjs from "dayjs";

import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export type TileClassNameProps = {
  date: Date;
  view: string;
};

const useWeekRecord = () => {
  // week 달력 관련 상태
  const [date, setDate] = useState<DateValue>(new Date());
  const [dateRange, setDateRange] = useState<string[]>(() => getWeekRange(new Date()));
  const [weekNum, setWeekNum] = useState<number>(() => dayjs(new Date()).week());

  const [weeklyTeamRecords, setWeekTeamRecords] = useState<WeeklyTeamRecords[]>([]);

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

  useEffect(() => {
    getWeeklyTeamRecord({ year: dayjs(date as Date).year(), week: weekNum }).then(({ data }) => {
      setWeekTeamRecords(data);
    });
  }, [dateRange]);

  return { weeklyTeamRecords, getTileClassName, handleActiveStartDateChange, handleDateClick, setDateRange, setDate, setWeekNum, dateRange, date };
};

export default useWeekRecord;
