import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CalendarColumn from "../../components/calendar/Calendar";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import SectionHeading from "../../components/section-heading/SectionHeading";
import Sidebar from "../../components/sidebar/Sidebar";
import TaskItems from "../../components/tasks-items/TaskItems";
import { auth, GetTaskDocCollection } from "../../firebase/firebase.config";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const data = await GetTaskDocCollection(user);
      setData(data);
      user ? setLoading(true) : setLoading(false);
    };
    getTasks();
  }, [user, loading]);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="project-boxes">
        {user && loading ? (
          data.map((item, id) => <TaskItems key={id} item={item} />)
        ) : user ? (
          <Loading />
        ) : (
          <SectionHeading
            center
            title="In order to see your tasks , please SIGN IN"
          />
        )}
      </div>
      <CalendarColumn />
    </>
  );
};

export default HomePage;
