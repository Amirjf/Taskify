import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/_global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./context/ThemeContext";
import { FullScreenProvider } from "./context/FullScreenContext";
import "css.gg/icons/all.css";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import { TasksProvider } from "./context/TasksContext";
import { UserProvider } from "./context/UserContext";

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
