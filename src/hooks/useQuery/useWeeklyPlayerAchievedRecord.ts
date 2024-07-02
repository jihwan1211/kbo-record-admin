import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlayerRecord } from "../../api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../models/team";

const useWeeklyPlayerAchievedRecord = (mondayOfWeek: Date, team: TeamType) => {
  const { data } = useQuery({
    queryKey: ["weekly", "record", team, "player", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "ACHIEVED"],
    queryFn: () => getWeeklyPlayerRecord({ date: dayjs(mondayOfWeek).format("YYYY-MM-DD"), isDone: true, team: team }),
  });
  return { data };
};

export default useWeeklyPlayerAchievedRecord;
