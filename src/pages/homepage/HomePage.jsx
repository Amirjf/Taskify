import React from "react";
import CalendarColumn from "../../components/calendar/Calendar";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <CalendarColumn />
    </>
  );
};

export default HomePage;
