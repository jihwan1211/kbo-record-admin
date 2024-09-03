import styled from "styled-components";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAlignJustify, FaAngleLeft } from "react-icons/fa";
import { LayoutStyleProps } from "../layout/layout";
import useTargetModeStore from "@/store/TargetModeStore";

export type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideHeader({ isOpen, setIsOpen }: Props) {
  const { setTargetModeState } = useTargetModeStore();
  const location = useLocation();
  const weeklyRef = useRef<HTMLDetailsElement>(null);
  const dailyRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (weeklyRef.current && weeklyRef.current.contains(e.target as Node)) {
        // 열린다는 것
        if (!weeklyRef.current.open) {
          if (dailyRef.current) dailyRef.current.removeAttribute("open");
        }
      }
      if (dailyRef.current && dailyRef.current.contains(e.target as Node)) {
        // 열린다는 것
        if (!dailyRef.current.open) {
          if (weeklyRef.current) weeklyRef.current.removeAttribute("open");
        }
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (target: "weekly" | "daily", mode: "team" | "player") => {
    setTargetModeState(target, mode);
  };

  return (
    <SideHeaderStyle $isOpen={isOpen}>
      <div className="icon">
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen && <FaAngleLeft />}
          <FaAlignJustify />
        </div>
      </div>

      <nav>
        <DetailStyle $isActive={location.pathname.includes("/weekly")} ref={weeklyRef}>
          <summary>주간 기록 관리</summary>
          <ul>
            <li onClick={() => handleClick("weekly", "team")}>
              <Link to="/weekly/team/not-achieved">미달성 팀 기록 관리</Link>
            </li>
            <li onClick={() => handleClick("weekly", "team")}>
              <Link to="/weekly/team/achieved">달성 팀 기록 관리</Link>
            </li>
            <li onClick={() => handleClick("weekly", "player")}>
              <Link to="/weekly/player/not-achieved">미달성 개인 기록 관리</Link>
            </li>
            <li onClick={() => handleClick("weekly", "player")}>
              <Link to="/weekly/player/achieved">달성 개인 기록 관리</Link>
            </li>
          </ul>
        </DetailStyle>
        <DetailStyle $isActive={location.pathname.includes("/daily")} ref={dailyRef}>
          <summary>일간 기록 관리</summary>
          <ul>
            <li onClick={() => handleClick("daily", "player")}>
              <Link to="/daily/not-achieved">미달성 개인 기록 관리</Link>
            </li>
            <li onClick={() => handleClick("daily", "player")}>
              <Link to="/daily/achieved">달성 개인 기록 관리</Link>
            </li>
          </ul>
        </DetailStyle>
      </nav>
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

  nav {
    width: 100%;
    margin-top: 25px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

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
`;

type DetailStyleProps = {
  $isActive?: boolean;
};

const DetailStyle = styled.details<DetailStyleProps>`
  display: flex;
  position: relative;
  color: ${({ $isActive, theme }) => ($isActive ? theme.menu.backgroundColor : theme.menu.color)};
  &::after {
    content: "+";
    position: absolute;
    top: 17px;
    right: 5px;
  }

  &[open]::after {
    content: "-";
    position: absolute;
    top: 17px;
    right: 5px;
  }

  ul {
    margin: 0;

    li {
      font-size: 0.85rem;
      cursor: pointer;
      border-radius: ${({ theme }) => theme.borderRadius.default};

      &:hover {
        background-color: ${({ theme }) => theme.menu.hoverBackgroundColor};
      }
      a {
        text-align: end;
        padding: 10px;
        display: block;
        text-decoration: none;
        color: white;
      }
    }
  }

  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    width: 100%;
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.menu.color : theme.menu.backgroundColor)};
    color: inherit;

    &:hover {
      background-color: ${({ $isActive, theme }) => ($isActive ? "" : theme.menu.hoverBackgroundColor)};
    }
  }
`;
