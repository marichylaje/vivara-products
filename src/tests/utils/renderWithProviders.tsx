import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "@app";

type Options = {
  route?: string;
} & Omit<RenderOptions, "wrapper">;

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", ...options }: Options = {},
) {
  const client = createTestQueryClient();

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return {
    client,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
