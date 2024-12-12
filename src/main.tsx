import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FolderProvider>
      <App />
    </FolderProvider>
  </StrictMode>
);
