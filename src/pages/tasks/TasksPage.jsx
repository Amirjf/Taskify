import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Tasks from "../../components/tasks/Tasks";
import CalendarColumn from "../../components/calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import SectionHeading from "../../components/section-heading/SectionHeading";

const TasksPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, [user]);
  return (
    <>
      <Header />
      <Sidebar />
      {user ? <Tasks /> : <SectionHeading title="Please Sign in first" />}
      <CalendarColumn />
    </>
  );
};

export default TasksPage;