import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <LayoutStyle>{children}</LayoutStyle>;
}

const LayoutStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.pc};
`;
