import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/Theme";
import { UserProvider } from "./contexts/User";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>
);
