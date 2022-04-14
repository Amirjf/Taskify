import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FullScreenProvider } from "./context/FullScreenContext";

import { BrowserRouter } from "react-router-dom";
import { TasksProvider } from "./context/TasksContext";
import { UserProvider } from "./context/UserContext";

import "react-toastify/dist/ReactToastify.min.css";
import "./assets/styles/_global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "css.gg/icons/all.css";
import "boxicons/css/boxicons.min.css";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <UserProvider>
        <FullScreenProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </FullScreenProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
