import styled, { css } from "styled-components";

type Variant = "primary" | "ghost";

export const Button = styled.button<{ $variant?: Variant }>`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    transform 120ms ease,
    opacity 120ms ease,
    border-color 120ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $variant, theme }) =>
    $variant === "primary" &&
    css`
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: white;

      &:hover {
        opacity: 0.95;
        border-color: ${theme.colors.primary};
      }
    `}
`;
