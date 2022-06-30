import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoriteCharacterContextProvider } from "./contexts/FavoriteCharacterContext";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoriteCharacterContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoriteCharacterContextProvider>
  </React.StrictMode>
);
