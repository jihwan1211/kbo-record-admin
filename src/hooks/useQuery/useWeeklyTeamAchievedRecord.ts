import { useQuery } from "@tanstack/react-query";
import { getWeeklyTeamRecord } from "../../api/record.api";
import dayjs from "dayjs";

const useWeeklyTeamAchievedRecord = (mondayOfWeek: Date) => {
  const { data } = useQuery({
    queryKey: ["weekly", "record", "team", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "ACHIEVED"],
    queryFn: () => getWeeklyTeamRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD"), true),
  });

  return { data };
};

export default useWeeklyTeamAchievedRecord;
