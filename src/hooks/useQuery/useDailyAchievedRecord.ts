import { useQuery } from "@tanstack/react-query";
import { getDailyRecords } from "@/api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../models/team";

const useDailyAchievedRecord = (date: Date, team: TeamType) => {
  const { data } = useQuery({
    queryKey: ["daily", "record", team, "player", dayjs(date).format("YYYY-MM-DD"), "ACHIEVED"],
    queryFn: () => getDailyRecords({ date: dayjs(date).format("YYYY-MM-DD"), isDone: true, team: team }),
  });
  return { data };
};

export default useDailyAchievedRecord;
