import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaAlignJustify, FaAngleRight } from "react-icons/fa";
import { Props } from "./SideHeader";
import useAuth from "../hooks/useAuth";
import Dropdown from "./Dropdown";
import { useAlert } from "../hooks/useAlert";

export default function Header({ isOpen, setIsOpen }: Props) {
  const { isLoggedIn, userLogout } = useAuth();
  const { showConfirm } = useAlert();

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

      <Link to="/">
        <h1>크보 기록 관리자 페이지</h1>
      </Link>

      <div className="auth">
        <Dropdown toggleButton={<FaRegUser />}>
          {isLoggedIn ? (
            <div onClick={() => showConfirm("로그아웃 하시겠습니까?", userLogout)}>로그아웃</div>
          ) : (
            <FlexBox>
              <Link to="/login" reloadDocument>
                로그인
              </Link>
              <Link to="/join" reloadDocument>
                회원가입
              </Link>
            </FlexBox>
          )}
        </Dropdown>
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

  a {
    text-decoration: none;
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
