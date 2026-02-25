import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space(3)};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space(1.5)};
  color: ${({ theme }) => theme.colors.muted};
`;

export const Textarea = styled.textarea`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(2.5)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  min-height: 90px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
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

export const ErrorText = styled.p`
  margin: 0;
  color: #fca5a5;
`;
