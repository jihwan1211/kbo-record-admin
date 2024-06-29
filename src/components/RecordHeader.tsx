import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import AddPlayerRecord from "./AddPlayerRecord";
import AddTeamRecord from "./AddTeamRecord";
import { useLocation } from "react-router-dom";
import AddPlayer from "./AddPlayer";

type Props = {
  title: string;
  handleRecordDelete: () => void;
  children: React.ReactNode;
};

export default function RecordHeader({ title, handleRecordDelete, children }: Props) {
  const [modalMenu, setModalMenu] = useState<"record-register" | "record-delete" | "player-register" | null>(null);
  const location = useLocation();

  return (
    <RecordHeaderStyle>
      <div className="title">
        <h2>{title}</h2>
        <div className="add-record">
          {location.pathname.includes("not-achieved") && (
            <div className="record-feature" onClick={() => setModalMenu("record-register")}>
              <FaPlusSquare />
              <p>기록 추가</p>
            </div>
          )}
          <div className="record-feature" onClick={handleRecordDelete}>
            <FaMinusSquare />
            <p>기록 삭제</p>
          </div>
          {location.pathname.includes("player") && (
            <div
              className="record-feature"
              onClick={() => {
                setModalMenu("player-register");
              }}
            >
              <FaPlusSquare />
              <p>선수 등록</p>
            </div>
          )}
        </div>
      </div>
      {children}
      <Modal isOpen={modalMenu} onClose={() => setModalMenu(null)}>
        {location.pathname.includes("team") ? (
          <AddTeamRecord onClose={() => setModalMenu(null)} />
        ) : (
          <>
            {modalMenu === "record-register" && <AddPlayerRecord onClose={() => setModalMenu(null)} />}
            {modalMenu === "player-register" && <AddPlayer onClose={() => setModalMenu(null)} />}
          </>
        )}
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
