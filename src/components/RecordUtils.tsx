import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { DateValue } from "../hooks/useWeekRecord";
import dayjs from "dayjs";
import { getWeeklyTeamRecord } from "../api/record.api";
import { WeeklyTeamRecords } from "../models/WeeklyTeamRecords";

type Props = {
  date: DateValue;
  weekNum: number;
  currentWeekData: WeeklyTeamRecords[];
  copyPrevWeekToCurrent: () => void;
};

export default function RecordUtils({ date, weekNum, currentWeekData, copyPrevWeekToCurrent }: Props) {
  // const { data } = useQuery({
  //   queryKey: ["weekly", "record", dayjs(date as Date).year(), weekNum - 1],
  //   queryFn: () => getWeeklyTeamRecord({ year: dayjs(date as Date).year(), week: weekNum - 1 }),
  //   enabled: currentWeekData?.length === 0,
  // });

  // console.log(data);

  return <RecordUtilsStyle>{/* <button onClick={copyPrevWeekToCurrent}>이전 주차 기록 불러오기</button> */}</RecordUtilsStyle>;
}

const RecordUtilsStyle = styled.div``;
