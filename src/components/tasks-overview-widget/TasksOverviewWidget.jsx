import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const TasksOverviewWidget = () => {
  return (
    <div className="col-md-6">
      <div className="tasks-overview">
        <div className="tasks-info">
          <span className="task-icon-container">
            <i className="bx bx-task"></i>
          </span>
          <div className="tasks-overview-title">
            <span className="tasks-count">12 </span>
            <span>Tasks</span>
            <div className="tasks-status">
              <span>Completed</span>
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
              path: { stroke: "#25c1b1" },
              trail: { stroke: "#4b4b59" },
            }}
            value={66}
            text={`${66}%`}
          />
        </div>
      </div>
    </div>
  );
};

export default TasksOverviewWidget;
