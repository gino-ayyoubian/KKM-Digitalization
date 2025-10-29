import React from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./i18n/LanguageProvider";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LanguageProvider defaultLocale="en">
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
