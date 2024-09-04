import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlayerRecord } from "../../../api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../../models/team";
import useDateStore from "@/store/DateStore";
import { getMondayDateOfWeek } from "@/lib/formatDate";

const useWeeklyPlayerNotAchievedRecord = (team: TeamType) => {
  const { date } = useDateStore();
  const { data, refetch } = useQuery({
    queryKey: ["weekly", "record", team, "player", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
    queryFn: () => getWeeklyPlayerRecord({ date: dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), isAchieved: false, team: team }),
  });

  return { data, refetch };
};

export default useWeeklyPlayerNotAchievedRecord;
