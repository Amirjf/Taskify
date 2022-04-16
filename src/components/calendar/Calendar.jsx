import React, { useContext } from "react";
import Calendar from "react-calendar";
import { AnimatePresence, motion } from "framer-motion";
import { FullScreenContext } from "../../context/FullScreenContext";
import "react-calendar/dist/Calendar.css";
import CompletedTaskItem from "../completed-task-item/CompletedTaskItem";
import Loading from "../loading/Loading";
import { TasksContext } from "../../context/TasksContext";
import "./calendar.styles.scss";

const CalendarColumn = () => {
  const { tasks, loading, setTaskToCompleted, completedTasks } =
    useContext(TasksContext);

  const { isFullScreen } = useContext(FullScreenContext);

  const user = localStorage.getItem("user");
  const currentUser = JSON.parse(user);

  return (
    <motion.div
      layout
      className={`calendar-container ${isFullScreen ? "hide" : ""}`}
    >
      <Calendar showNeighboringMonth={false} value={new Date()} />
      <h4 className="completed-tasks-header">
        <span className="text-success">Finished</span> Tasks
      </h4>
      {completedTasks.length > 0 && currentUser && (
        <motion.div layout className="finished-tasks-container">
          <AnimatePresence>
            {loading ? (
              completedTasks.map((task) => (
                <CompletedTaskItem key={task.taskId} task={task} />
              ))
            ) : (
              <Loading />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CalendarColumn;
