import styled from "styled-components";
import { useState } from "react";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useWeekRecord from "../hooks/useWeekRecord";
import useSecondMenuStore from "../store/SideMenuStore";
import { FaPlusSquare } from "react-icons/fa";
import Modal from "../components/Modal";
import AddTeamRecord from "../components/AddTeamRecord";

export default function Weekly() {
  const { weeklyUndoneTeamRecords, weeklyDoneTeamRecords, handleDateClick, mondayOfWeek, getTileClassName, setDate, date } = useWeekRecord();
  const { secondMenu } = useSecondMenuStore();
  const [isModalOpened, setIsModalOpen] = useState(false);
  if (!weeklyUndoneTeamRecords || !weeklyDoneTeamRecords) return null;

  return (
    <WeeklyStyle>
      <div className="data">
        {secondMenu === "UNDONE" ? (
          <>
            <div className="title">
              <h2>미달성 기록 관리</h2>
              <div className="add-record" onClick={() => setIsModalOpen(true)}>
                <FaPlusSquare />
                <p>기록 추가</p>
              </div>
            </div>
            <RecordTable records={weeklyUndoneTeamRecords} mode="team" mondayOfWeek={mondayOfWeek} />
          </>
        ) : (
          <>
            <h1>달성 기록 관리</h1>
            <RecordTable records={weeklyDoneTeamRecords} mode="team" mondayOfWeek={mondayOfWeek} />
          </>
        )}
      </div>
      <div>
        <MyCalendar handleDateClick={handleDateClick} getTileClassName={getTileClassName} setDate={setDate} date={date} />
      </div>
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpen(false)}>
        <AddTeamRecord onClose={() => setIsModalOpen(false)} />
      </Modal>
    </WeeklyStyle>
  );
}

const WeeklyStyle = styled.div`
  display: flex;
  justify-content: space-between;

  .data {
    flex: 1;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .add-record {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10px;

      svg {
        width: 20px;
        height: 20px;
      }

      p {
        margin: 0;
        font-size: 0.8rem;
      }
    }
  }
`;
