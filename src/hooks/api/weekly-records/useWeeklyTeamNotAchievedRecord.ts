import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../../../api/record.api";
import dayjs from "dayjs";
import useDateStore from "@/store/DateStore";
import { getMondayDateOfWeek } from "@/lib/formatDate";

const useWeeklyTeamNotAchievedRecord = () => {
  const { date } = useDateStore();
  const { data } = useQuery({
    queryKey: ["weekly", "record", "team", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
    queryFn: () => getWeeklyTeamRecord({ date: dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), isAchieved: false }),
  });

  return { data };
};

export default useWeeklyTeamNotAchievedRecord;
