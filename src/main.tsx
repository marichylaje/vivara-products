import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProviders } from "@app";
import App from "@app/App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
}
