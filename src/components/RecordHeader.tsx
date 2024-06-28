import { FaPlusSquare } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import AddPlayerRecord from "./AddPlayerRecord";
import AddTeamRecord from "./AddTeamRecord";
import useSideMenuStore from "../store/SideMenuStore";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  handleRecordDelete: () => void;
  children: React.ReactNode;
};

export default function RecordHeader({ title, handleRecordDelete, children }: Props) {
  const [isModalOpened, setIsModalOpen] = useState(false);
  const { secondMenu } = useSideMenuStore();
  const location = useLocation();
  console.log(location);
  return (
    <RecordHeaderStyle>
      <div className="title">
        <h2>{title}</h2>
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
      {children}
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpen(false)}>
        {location.pathname.includes("team") ? <AddTeamRecord onClose={() => setIsModalOpen(false)} /> : <AddPlayerRecord onClose={() => setIsModalOpen(false)} />}
      </Modal>
    </RecordHeaderStyle>
  );
}

const RecordHeaderStyle = styled.div`
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
