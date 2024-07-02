import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAlignJustify, FaAngleLeft } from "react-icons/fa";
import { LayoutStyleProps } from "../layout/layout";
import { FaRegSquareMinus } from "react-icons/fa6";
import useSideMenuStore from "../store/SideMenuStore";
import { useNavigate } from "react-router-dom";
import { TSecondMenu } from "../store/SideMenuStore";

export type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideHeader({ isOpen, setIsOpen }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<"week" | "daily" | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { setSecondMenu } = useSideMenuStore();

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef]);

  const handleMenuClick = (menu: "week" | "daily", e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleNavigate = (path: string, menu: TSecondMenu) => {
    setSecondMenu(menu);
    navigate(path);
  };

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
          <LiStyle className="weekly" $isActive={location.pathname.includes("/weekly")} onClick={(e) => handleMenuClick("week", e)} ref={dropdownRef}>
            <p>주간 기록 관리</p>
            {activeMenu === "week" && <FaRegSquareMinus />}
          </LiStyle>
          {activeMenu === "week" && (
            <ul className="second-menu">
              <li onClick={() => handleNavigate("/weekly/team/not-achieved", "WEEKLY-TEAM-NOT-ACHIEVED")}>
                <p>미달성 팀 기록 관리</p>
              </li>
              <li onClick={() => handleNavigate("/weekly/team/achieved", "WEEKLY-TEAM-ACHIEVED")}>
                <p>달성 팀 기록 관리</p>
              </li>
              <li onClick={() => handleNavigate("/weekly/player/not-achieved", "WEEKLY-PLAYER-NOT-ACHIEVED")}>
                <p>미달성 개인 기록 관리</p>
              </li>
              <li onClick={() => handleNavigate("/weekly/player/achieved", "WEEKLY-PLAYER-ACHIEVED")}>
                <p>달성 개인 기록 관리</p>
              </li>
            </ul>
          )}
          <LiStyle className="daily" $isActive={location.pathname.includes("/daily")} onClick={(e) => handleMenuClick("daily", e)} ref={dropdownRef}>
            <p>일간 기록 관리</p>
            {activeMenu === "daily" && <FaRegSquareMinus />}
          </LiStyle>
          {activeMenu === "daily" && (
            <ul className="second-menu">
              <li onClick={() => handleNavigate("/daily/not-achieved", "DAILY-NOT-ACHIEVED")}>
                <p>미달성 기록 관리</p>
              </li>
              <li onClick={() => handleNavigate("/daily/achieved", "DAILY-ACHIEVED")}>
                <p>달성 기록 관리</p>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </SideHeaderStyle>
  );
}

const SideHeaderStyle = styled.div<LayoutStyleProps>`
  width: 200px;
  height: 100dvh;
  padding: 10px;
  background-color: ${({ theme }) => theme.menu.backgroundColor};
  position: sticky;
  top: 0;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    svg {
      fill: ${({ theme }) => theme.menu.color};
    }
  }

  .link {
    width: 100%;
    margin-top: 25px;
    font-weight: 600;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      p {
        margin: 0;
      }
    }
  }

  .second-menu {
    li {
      padding: 10px;
      font-size: 0.85rem;
      cursor: pointer;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      p {
        margin: 0;
        top: 0;
        left: 0;
        color: white;
      }
    }

    li:hover {
      background-color: ${({ theme }) => theme.menu.hoverBackgroundColor};
    }
  }
`;

type LiStyleProps = {
  $isActive?: boolean;
};

const LiStyle = styled.li<LiStyleProps>`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.menu.color : theme.menu.backgroundColor)};

  position: relative;
  svg {
    z-index: 1000;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    fill: ${({ $isActive, theme }) => ($isActive ? theme.menu.backgroundColor : theme.menu.color)};
  }

  &:hover {
    background-color: ${({ $isActive, theme }) => ($isActive ? "" : theme.menu.hoverBackgroundColor)};
  }

  p {
    color: ${({ $isActive, theme }) => ($isActive ? theme.menu.backgroundColor : theme.menu.color)};
  }
`;
