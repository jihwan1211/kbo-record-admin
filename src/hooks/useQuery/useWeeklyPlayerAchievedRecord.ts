import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlayerRecord } from "../../api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../models/team";
import useDateStore from "@/store/DateStore";
import { getMondayDateOfWeek } from "@/lib/formatDate";

const useWeeklyPlayerAchievedRecord = (team: TeamType) => {
  const { date } = useDateStore();
  const { data } = useQuery({
    queryKey: ["weekly", "record", team, "player", dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), "ACHIEVED"],
    queryFn: () => getWeeklyPlayerRecord({ date: dayjs(getMondayDateOfWeek(date)).format("YYYY-MM-DD"), isDone: true, team: team }),
  });
  return { data };
};

export default useWeeklyPlayerAchievedRecord;
