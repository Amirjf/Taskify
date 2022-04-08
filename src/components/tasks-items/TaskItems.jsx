import React from "react";
import { motion } from "framer-motion";

import "./_taskitems.scss";

const statusColors = {
  urgent: "rgb(229 25 25 / 60%)",
  working: "#0fcaac",
  notImportant: "#6c6d6d",
};

const TaskItems = ({ item }) => {
  const { taskStatus, taskCreatedAt, taskCategory, taskTitle, taskColor } =
    item;

  const handleStatusColor = () => {
    switch (taskStatus) {
      case "urgent":
        return statusColors.urgent;
      case "working":
        return statusColors.working;
      case "notImportant":
        return statusColors.notImportant;
      default:
        return;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="project-box-wrapper container-lg"
    >
      <div
        className="project-box"
        style={{ background: taskColor ? taskColor : "#c8f7dc" }}
      >
        <div className="project-box-header">
          <span>{taskCreatedAt}</span>
          <div className="more-wrapper">
            <button className="add-participant">
              <i className="gg-check text-success"></i>
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{taskTitle}</p>
          <p className="box-content-subheader">{taskCategory}</p>
        </div>
        <div className="status-container">
          <div className="status" style={{ background: handleStatusColor() }}>
            {taskStatus}
          </div>
        </div>

        <div className="project-box-footer">
          <div className="participants">
            <button className="add-participant">
              {/* todo : work on deleting tasks */}
              <i className="gg-trash text-danger"></i>
            </button>
          </div>
          <button className="add-participant">
            <i className="gg-pen text-warning"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItems;
