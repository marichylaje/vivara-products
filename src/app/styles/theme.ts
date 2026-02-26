export const theme = {
  colors: {
    bg: "#0b0d10",
    surface: "#0f1318",
    border: "#2a2f3a",
    text: "#eaeef7",
    muted: "#94a3b8",
    primary: "#4f46e5",
    danger: "#b91c1c",
    dangerHover: "#dc2626",
    dangerSoft: "#fee2e2",
  },
  radius: {
    sm: "10px",
    md: "12px",
    lg: "14px",
  },
  space: (n: number) => `${n * 4}px`,
  shadow: {
    sm: "0 6px 24px rgba(0,0,0,0.25)",
  },
} as const;

export type AppTheme = typeof theme;
