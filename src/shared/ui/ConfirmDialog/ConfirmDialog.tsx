import styled from "styled-components";

import { Button, Modal } from "@shared";

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space(3)};
`;

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isConfirming?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger,
  onConfirm,
  onClose,
  isConfirming,
}: Props) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p style={{ margin: 0, color: "#94a3b8" }}>{description}</p>

      <Actions>
        <Button type="button" onClick={onClose} disabled={isConfirming}>
          {cancelText}
        </Button>
        <Button
          type="button"
          $variant={danger ? "primary" : "primary"}
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? "Working..." : confirmText}
        </Button>
      </Actions>
    </Modal>
  );
}
