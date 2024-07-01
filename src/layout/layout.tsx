import styled from "styled-components";
import SideHeader from "../components/SideHeader";
import Header from "../components/Header";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <LayoutStyle $isOpen={isMenuOpen}>
      <SideHeader isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <main>
        <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        {children}
      </main>
    </LayoutStyle>
  );
}

export type LayoutStyleProps = {
  $isOpen: boolean;
};

const LayoutStyle = styled.div<LayoutStyleProps>`
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  /* max-width: ${({ theme }) => theme.layout.width.pc};
  max-width: 100%; */

  main {
    width: 100%;
    margin-left: ${({ $isOpen }) => ($isOpen ? 0 : "-160px")};
  }

  display: flex;
`;
