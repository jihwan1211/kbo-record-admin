import styled from "styled-components";
import RecordHeader from "@components/RecordHeader";
import WeekCalendar from "@components/Calendar/WeekCalendar";
import DayCalendar from "@components/Calendar/DayCalendar";
import useTargetModeStore from "@/store/TargetModeStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function RecordLayout({ children, title }: Props) {
  const { target, setTargetModeState } = useTargetModeStore();
  const location = useLocation();

  useEffect(() => {
    const locationArr = location.pathname.split("/");
    let target = locationArr[1];
    let mode = locationArr[2];
    if (target === "daily") mode = "player";
    setTargetModeState(target as "weekly" | "daily", mode as "team" | "player");
  }, [location]);

  return (
    <WeeklyStyle>
      <div className="data">
        <RecordHeader title={title}>{children}</RecordHeader>
      </div>
      {target === "weekly" ? <WeekCalendar /> : <DayCalendar />}
    </WeeklyStyle>
  );
}

export const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  .data {
    flex: 1;
  }

  .select-team {
    position: absolute;
    display: flex;
    gap: 10px;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;
