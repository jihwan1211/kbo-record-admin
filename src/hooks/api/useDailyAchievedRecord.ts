import { useQuery } from "@tanstack/react-query";
import { getDailyRecords } from "@/api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../models/team";
import useDateStore from "@/store/DateStore";

const useDailyAchievedRecord = (team: TeamType) => {
  const { date } = useDateStore();
  const { data } = useQuery({
    queryKey: ["daily", "record", team, "player", dayjs(date as Date).format("YYYY-MM-DD"), "ACHIEVED"],
    queryFn: () => getDailyRecords({ date: dayjs(date as Date).format("YYYY-MM-DD"), isAchieved: true, team: team }),
  });
  return { data };
};

export default useDailyAchievedRecord;
