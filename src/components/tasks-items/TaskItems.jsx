import React from "react";
import { motion } from "framer-motion";

import "./_taskitems.scss";

const statusColors = {
  urgent: "rgb(229 25 25 / 60%)",
  working: "#0fcaac",
  notImportant: "#6c6d6d",
};

const TaskItems = ({ item, onRemoveItem, onTaskCompleted }) => {
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
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="project-box-wrapper container-lg"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        layout
        className="project-box"
        style={{ background: taskColor ? taskColor : "#c8f7dc" }}
      >
        <div className="project-box-header">
          <span>{taskCreatedAt}</span>
          <div className="more-wrapper">
            <button
              className="add-participant"
              onClick={() => onTaskCompleted(item)}
            >
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
            <button
              className="add-participant"
              onClick={() => onRemoveItem(item)}
            >
              <i className="gg-trash text-danger"></i>
            </button>
          </div>
          <button className="add-participant">
            <i className="gg-pen text-warning"></i>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItems;
