import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space(4)};
`;

export const Dialog = styled.div`
  width: min(720px, 100%);
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

export const Header = styled.div`
  padding: ${({ theme }) => theme.space(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
  align-items: center;
`;

export const Title = styled.strong`
  flex: 1;
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.space(3)};
`;
