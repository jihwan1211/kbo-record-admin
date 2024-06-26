import styled from "styled-components";
import { useState } from "react";
import MyCalendar from "../components/MyCalender";
import RecordTable from "../components/RecordTable";
import useWeekRecord from "../hooks/useWeekRecord";
import useSecondMenuStore from "../store/SideMenuStore";
import { FaPlusSquare } from "react-icons/fa";
import Modal from "../components/Modal";
import AddTeamRecord from "../components/AddTeamRecord";
import useRecordDelete from "../hooks/useRecordDelete";
import { useAlert } from "../hooks/useAlert";
import useToastStore from "../store/ToastStore";

export default function Weekly() {
  const { weeklyUndoneTeamRecords, weeklyDoneTeamRecords, handleDateClick, mondayOfWeek, setDate, date, dateRange } = useWeekRecord();
  const { deleteTargets, setDeleteTargets, mutation } = useRecordDelete();
  const { secondMenu } = useSecondMenuStore();
  const { showConfirm } = useAlert();
  const { addToast } = useToastStore();
  const [isModalOpened, setIsModalOpen] = useState(false);
  if (!weeklyUndoneTeamRecords || !weeklyDoneTeamRecords) return null;

  const handleRecordDelete = () => {
    if (deleteTargets.length) showConfirm("정말로 삭제하시겠습니까?", mutation.mutate);
    else {
      addToast({ message: "삭제할 기록을 선택하십시오", type: "error" });
    }
  };

  return (
    <WeeklyStyle>
      <div className="data">
        {secondMenu === "UNDONE" ? (
          <>
            <div className="title">
              <h2>미달성 기록 관리</h2>
              <div className="add-record">
                <div className="record-feature" onClick={() => setIsModalOpen(true)}>
                  <FaPlusSquare />
                  <p>기록 추가</p>
                </div>
                <div className="record-feature" onClick={handleRecordDelete}>
                  <FaPlusSquare />
                  <p>기록 삭제</p>
                </div>
              </div>
            </div>
            <RecordTable records={weeklyUndoneTeamRecords} mode="team" mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
          </>
        ) : (
          <>
            <h1>달성 기록 관리</h1>
            <RecordTable records={weeklyDoneTeamRecords} mode="team" mondayOfWeek={mondayOfWeek} setDeleteTargets={setDeleteTargets} deleteTargets={deleteTargets} />
          </>
        )}
      </div>
      <MyCalendar handleDateClick={handleDateClick} setDate={setDate} date={date} dateRange={dateRange} />
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
      justify-content: center;
      gap: 10px;
      align-items: center;
      margin-right: 10px;

      .record-feature {
        display: flex;
        flex-direction: column;
        align-items: center;
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
  }
`;
