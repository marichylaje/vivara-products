import { createGlobalStyle } from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    text-rendering: optimizeLegibility; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }

  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
`;
