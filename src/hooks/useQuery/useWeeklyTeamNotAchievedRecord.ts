import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../../api/record.api";
import dayjs from "dayjs";

const useWeeklyTeamNotAchievedRecord = (mondayOfWeek: Date) => {
  const { data } = useQuery({
    queryKey: ["weekly", "record", "team", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
    queryFn: () => getWeeklyTeamRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD"), false),
  });

  return { data };
};

export default useWeeklyTeamNotAchievedRecord;
