import React, { useContext } from "react";
import CalendarColumn from "../../components/calendar/Calendar";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import SectionHeading from "../../components/section-heading/SectionHeading";
import Sidebar from "../../components/sidebar/Sidebar";

import { TasksContext } from "../../context/TasksContext";
import TasksOverviewWidget from "../../components/tasks-overview-widget/TasksOverviewWidget";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";

const HomePage = () => {
  const { loading } = useContext(TasksContext);

  const [user] = useAuthState(auth);

  return (
    <>
      <Sidebar />
      <Header />
      {user && loading ? (
        <div className="d-flex">
          <TasksOverviewWidget inProgress />
          <TasksOverviewWidget />
        </div>
      ) : user ? (
        <Loading />
      ) : (
        <SectionHeading title="Please Sign In To Your Account" center />
      )}
    </>
  );
};

export default HomePage;
