import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaAlignJustify, FaAngleLeft } from "react-icons/fa";
import { LayoutStyleProps } from "../layout/layout";

export type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideHeader({ isOpen, setIsOpen }: Props) {
  const location = useLocation();

  return (
    <SideHeaderStyle $isOpen={isOpen}>
      <div className="icon">
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen && <FaAngleLeft />}
          <FaAlignJustify />
        </div>
      </div>

      <div className="link">
        <ul>
          <LiStyle className="weekly" $isActive={location.pathname === "/weekly"}>
            <Link to="/weekly">주간 기록 관리</Link>
          </LiStyle>
          <LiStyle className="daily" $isActive={location.pathname === "/daily"}>
            <Link to="/daily">일간 기록 관리</Link>
          </LiStyle>
        </ul>
      </div>
    </SideHeaderStyle>
  );
}

const SideHeaderStyle = styled.div<LayoutStyleProps>`
  width: 160px;
  height: 100dvh;
  padding: 10px;
  background-color: ${({ theme }) => theme.menu.backgroundColor};
  position: sticky;
  top: 0;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: 0.3s ease-in-out;

  .icon {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    svg {
      fill: ${({ theme }) => theme.menu.color};
    }
  }

  .link {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        text-decoration: none;
        font-weight: 600;
      }

      li {
        padding: 10px;
        cursor: pointer;
      }
    }
  }
`;

type LiStyleProps = {
  $isActive: boolean;
};

const LiStyle = styled.li<LiStyleProps>`
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.menu.color : theme.menu.backgroundColor)};

  &:hover {
    background-color: ${({ $isActive, theme }) => ($isActive ? "" : theme.menu.hoverBackgroundColor)};
  }

  a {
    color: ${({ $isActive, theme }) => ($isActive ? theme.menu.backgroundColor : theme.menu.color)};
  }
`;
