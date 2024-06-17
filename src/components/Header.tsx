import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaAlignJustify, FaAngleRight } from "react-icons/fa";
import { Props } from "./SideHeader";

export default function Header({ isOpen, setIsOpen }: Props) {
  return (
    <HeaderStyle>
      <div className="icon">
        <div onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && (
            <>
              <FaAlignJustify />
              <FaAngleRight />
            </>
          )}
        </div>
      </div>

      <h1>크보 기록 관리자 페이지</h1>

      <div className="auth">
        <Link to="/login">
          <FaRegUser />
        </Link>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    cursor: pointer;
  }
`;
