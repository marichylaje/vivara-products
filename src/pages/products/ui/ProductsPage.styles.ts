import styled from "styled-components";

export const Page = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(4)};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
`;

export const Subtle = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const TableWrap = styled.div`
  margin-top: ${({ theme }) => theme.space(3)};
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.space(2.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.space(2.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Right = styled.div`
  text-align: right;
`;

export const Footer = styled.footer`
  margin-top: ${({ theme }) => theme.space(3)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)};
`;

export const Tools = styled.div`
  margin-left: auto;
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
  align-items: center;
`;
