import React from "react";
import CalendarColumn from "./components/calendar/Calendar";
import Header from "./components/header/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/sidebar/Sidebar";
import Todo from "./components/todo/ToDo";
import "./App.css";

const App = () => {
  return (
    <div>
      <Sidebar />
      <MainContent>
        <Header />
        <Todo />
      </MainContent>
      <CalendarColumn />
    </div>
  );
};

export default App;
