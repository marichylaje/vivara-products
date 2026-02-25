import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

import { createQueryClient } from "@shared";

export function AppProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => createQueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
