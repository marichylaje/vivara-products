import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";
import { ThemeProvider } from "styled-components";

import { createQueryClient } from "@shared";

import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

export function AppProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
