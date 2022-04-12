import React, { useEffect, useState, useContext } from "react";
import CalendarColumn from "../../components/calendar/Calendar";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import SectionHeading from "../../components/section-heading/SectionHeading";
import Sidebar from "../../components/sidebar/Sidebar";
import TaskItems from "../../components/tasks-items/TaskItems";
import { auth, db2 } from "../../firebase/firebase.config";
import { collection, doc, getDocs } from "firebase/firestore";
import {
  deleteTaskDoc,
  GetTaskDocCollection,
  setTaskCompleted,
} from "../../firebase/firebase.utils";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  const taskCompleted = async (item) => {
    item["isTaskCompleted"] = true;

    await setTaskCompleted(currentUser, item);
    const filteredData = tasks
      .filter((task) => task.isTaskCompleted === false)
      .map((task) => task);

    setTasks(filteredData);
  };

  const removeItem = (taskToRemove) => {
    deleteTaskDoc(currentUser, taskToRemove);
    const filtered = tasks.filter((e) => e !== taskToRemove);
    setTasks(filtered);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userRef = doc(db2, "users", currentUser.uid);
        const tasksDoc = await getDocs(collection(userRef, "tasks"));
        const data = tasksDoc.docs.map((doc) => {
          return doc.data();
        });

        data ? setLoading(true) : setLoading(false);

        const filteredData = data
          .filter((task) => task.isTaskCompleted === false)
          .map((task) => task);

        setTasks(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [loading]);

  console.log(tasks);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="project-boxes">
        {currentUser && loading ? (
          tasks.map((item) => (
            <TaskItems
              onTaskCompleted={taskCompleted}
              onRemoveItem={removeItem}
              key={item.taskId}
              item={item}
            />
          ))
        ) : currentUser ? (
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
