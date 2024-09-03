import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
};

export default function Dropdown({ children, toggleButton }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <DropdownStyle ref={dropdownRef} $isLoggedIn={isLoggedIn}>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{toggleButton}</button>
      {isDropdownOpen && <div className="dropdown">{children}</div>}
    </DropdownStyle>
  );
}

type DropdownStyleProps = {
  $isLoggedIn: boolean;
};

const DropdownStyle = styled.div<DropdownStyleProps>`
  cursor: pointer;
  position: relative;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    svg {
      fill: ${({ theme, $isLoggedIn }) => ($isLoggedIn ? theme.color.success : "")};
    }
  }

  .dropdown {
    position: absolute;
    font-size: 1rem;
    padding: 10px;
    right: 0;
    width: 100px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background-color: white;
  }
`;
