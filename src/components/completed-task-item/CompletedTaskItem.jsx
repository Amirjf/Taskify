import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { animate, motion } from "framer-motion";
import "./_completed-taskitem.scss";
const CompletedTaskItem = ({ task }) => {
  const { removeCompletedTask } = useContext(TasksContext);
  const [isRemoved, setIsRemoved] = useState(false);
  const { taskTitle, taskCategory } = task;

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320 }}
      transition={{ type: "spring" }}
      layout
      className="completed-tasks-container"
    >
      <div className="task-info">
        <span
          className="undo-icon-container"
          onClick={() => removeCompletedTask(task)}
        >
          <i className="bx bx-trash"></i>
        </span>
        <div>
          <div className="task-completed-title">{taskTitle}</div>
          <div className="task-completed-category">{taskCategory}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletedTaskItem;
