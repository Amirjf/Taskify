import React from "react";
import CalendarColumn from "./components/calendar/Calendar";
import Header from "./components/header/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/sidebar/Sidebar";
import Todo from "./components/todo/ToDo";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <MainContent>
        <Sidebar />
        <Header />
        <Routes>
          {/* <Route
            path="/"
            element={(props) => props.location.pathname !== "/" && <Header />}
          /> */}
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </MainContent>
      <CalendarColumn />
    </div>
  );
};

export default App;
