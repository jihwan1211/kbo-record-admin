import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlayerRecord } from "../../api/record.api";
import dayjs from "dayjs";
import { TeamType } from "../../models/team";

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const useWeeklyPlayerNotAchievedRecord = (mondayOfWeek: Date, team: TeamType) => {
  const { data } = useQuery({
    queryKey: ["weekly", "record", team, "player", dayjs(mondayOfWeek).format("YYYY-MM-DD"), "NOT-ACHIEVED"],
    queryFn: () => getWeeklyPlayerRecord(dayjs(mondayOfWeek).format("YYYY-MM-DD"), false, team),
  });

  return { data };
};

export default useWeeklyPlayerNotAchievedRecord;