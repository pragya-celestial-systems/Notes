import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { NotesProvider } from "./context/Notes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-z77gevx0jbyauffk.us.auth0.com"
      clientId="gGnYXsroSaK5obFL7rvPfzDPhlcH8xZe"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <NotesProvider>
        <App />
      </NotesProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
