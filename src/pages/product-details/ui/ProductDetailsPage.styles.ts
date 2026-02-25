import styled from "styled-components";

export const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(4)};
`;

export const BackLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Card = styled.div`
  margin-top: ${({ theme }) => theme.space(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.space(4)};
`;

export const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space(2)} 0;
`;

export const Muted = styled.p`
  margin: 0 0 ${({ theme }) => theme.space(3)} 0;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space(2.5)};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
