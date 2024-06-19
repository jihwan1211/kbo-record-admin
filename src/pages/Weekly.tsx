import styled from "styled-components";
import MyCalendar from "../components/MyCalender";

export default function Weekly() {
  return (
    <WeeklyStyle>
      <div>기록들 fetching</div>
      <MyCalendar />
    </WeeklyStyle>
  );
}

const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
