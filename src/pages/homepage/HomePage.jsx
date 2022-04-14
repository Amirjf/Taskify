import React, { useContext } from "react";
import CalendarColumn from "../../components/calendar/Calendar";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import SectionHeading from "../../components/section-heading/SectionHeading";
import Sidebar from "../../components/sidebar/Sidebar";
import TaskItems from "../../components/tasks-items/TaskItems";
import { TasksContext } from "../../context/TasksContext";
import TasksOverviewWidget from "../../components/tasks-overview-widget/TasksOverviewWidget";

// import "../../react-circular-progressbar/dist/styles.css";

import "./_homepage.scss";

const HomePage = () => {
  const { tasks, loading } = useContext(TasksContext);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="d-flex">
        <TasksOverviewWidget />
        <TasksOverviewWidget />
      </div>
      <CalendarColumn />
    </>
  );
};

export default HomePage;
