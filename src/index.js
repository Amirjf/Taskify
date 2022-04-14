import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FullScreenProvider } from "./context/FullScreenContext";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { TasksProvider } from "./context/TasksContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "css.gg/icons/all.css";
import "boxicons/css/boxicons.min.css";
import "react-circular-progressbar/dist/styles.css";
import "./assets/styles/_global.scss";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <UserProvider>
        <TasksProvider>
          <FullScreenProvider>
            <App />
          </FullScreenProvider>
        </TasksProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
