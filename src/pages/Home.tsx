import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <HomeStyle>
      <h1>크보 기록 관리자 페이지</h1>
      <div className="auth">
        <Link to="/login">
          <FaRegUser />
        </Link>
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
