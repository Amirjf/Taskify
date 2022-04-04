import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/_global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./components/context/ThemeContext";
import "css.gg/icons/all.css";
import App from "./App";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
