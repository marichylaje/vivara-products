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
  flex-wrap: wrap; /* ✅ allow wrap */

  @media (max-width: 640px) {
    align-items: stretch;
  }
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

  @media (max-width: 640px) {
    min-width: 0; /* ✅ no forced horizontal width */
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.space(2.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;

  @media (max-width: 640px) {
    display: none; /* ✅ hide header on mobile */
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.space(2.5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space(2)};
    padding: ${({ theme }) => theme.space(2)};

    &::before {
      content: attr(data-label);
      color: ${({ theme }) => theme.colors.muted};
      font-weight: 600;
    }
  }
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background 120ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
  @media (max-width: 640px) {
    display: block;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    overflow: hidden;
    margin-bottom: ${({ theme }) => theme.space(2)};
    background: ${({ theme }) => theme.colors.surface};
  }
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

  @media (max-width: 640px) {
    margin-left: 0;
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(2.5)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SearchWrap = styled.div`
  width: 260px;

  @media (max-width: 640px) {
    width: 100%;
    flex: 1;
  }
`;
