import { type MouseEvent, type PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

import * as S from "./Modal.styles";

type Props = PropsWithChildren<{
  open: boolean;
  title: string;
  onClose: () => void;
}>;

export function Modal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <S.Overlay role="dialog" aria-modal="true" aria-label={title} onMouseDown={onClose}>
      <S.Dialog onMouseDown={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: 0, color: "inherit", cursor: "pointer" }}
          >
            ✕
          </button>
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Dialog>
    </S.Overlay>,
    document.body,
  );
}
