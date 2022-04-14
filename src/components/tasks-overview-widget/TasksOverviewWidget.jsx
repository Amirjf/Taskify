import React, { useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { TasksContext } from "../../context/TasksContext";

const TasksOverviewWidget = ({ inProgress }) => {
  const { openTasksCount, completedTasksCount } = useContext(TasksContext);

  return (
    <div className="col-md-6">
      <div className="tasks-overview">
        <div className="tasks-info">
          <span className="task-icon-container">
            <i className={`bx bx-${inProgress ? "hourglass" : "task"}`}></i>
          </span>
          <div className="tasks-overview-title">
            <span className="tasks-count">
              {`${inProgress ? openTasksCount : completedTasksCount}`}{" "}
            </span>
            <span>Tasks</span>
            <div className="tasks-status">
              {inProgress ? <span>In Progress</span> : <span>Completed</span>}
            </div>
          </div>
        </div>
        <div
          className="tasks-progress"
          style={{
            width: 60,
            height: 60,
          }}
        >
          <CircularProgressbar
            styles={{
              path: { stroke: inProgress ? "#25c1b1" : "#b1b1fa" },
              trail: { stroke: "#4b4b59" },
            }}
            maxValue={100}
            value={inProgress ? openTasksCount : completedTasksCount}
            text={`${inProgress ? openTasksCount : completedTasksCount}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TasksOverviewWidget;
