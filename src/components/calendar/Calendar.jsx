import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.styles.scss";
import { motion } from "framer-motion";
import { FullScreenContext } from "../../context/FullScreenContext";

import "react-calendar/dist/Calendar.css";
import { useTasksContext } from "../../context/TasksContext";
import CompletedTaskItem from "../completed-task-item/CompletedTaskItem";
import { db2 } from "../../firebase/firebase.config";
import { collection, doc, getDocs } from "firebase/firestore";
import Loading from "../loading/Loading";

const CalendarColumn = () => {
  const { isFullScreen } = useContext(FullScreenContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

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
          .filter((task) => task.isTaskCompleted === true)
          .map((task) => task);

        setTasks(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      layout
      className={`calendar-container ${isFullScreen ? "hide" : ""}`}
    >
      <Calendar showNeighboringMonth={false} value={new Date()} />
      {currentUser && (
        <>
          <h4 className="completed-tasks-header">
            <span className="text-success">Finished</span> Tasks
          </h4>
          {loading ? (
            tasks
              .filter((task, idx) => idx < 15)
              .map((task) => (
                <CompletedTaskItem key={task.taskId} task={task} />
              ))
          ) : (
            <Loading />
          )}
        </>
      )}
    </motion.div>
  );
};

export default CalendarColumn;
