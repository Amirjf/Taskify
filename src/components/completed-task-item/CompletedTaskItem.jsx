import React from "react";

const CompletedTaskItem = ({ task }) => {
  const { taskTitle, taskCategory, taskColor } = task;
  return (
    <div
      className="completed-tasks-container"
      style={{ background: taskColor ? taskColor : "rgb(200, 247, 220)" }}
    >
      <div className="task-info">
        <span className="undo-icon-container">
          <i className="bx bx-undo"></i>
        </span>
        <div>
          <div className="task-completed-title">{taskTitle}</div>
          <div className="task-completed-category">{taskCategory}</div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskItem;
