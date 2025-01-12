import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotesProvider } from "./context/Notes";
import { ColorProvider } from "./context/Color";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <NotesProvider>
      <ColorProvider>
        <App />
      </ColorProvider>
    </NotesProvider>
  </React.StrictMode>,
);
