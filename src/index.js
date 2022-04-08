import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/_global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./components/context/ThemeContext";
import { FullScreenProvider } from "./components/context/FullScreenContext";
import "css.gg/icons/all.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <FullScreenProvider>
        <App />
      </FullScreenProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
