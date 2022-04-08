import React from "react";
import { motion } from "framer-motion";
import MoreButton from "../../assets/images/more-btn.svg";
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
    <div className="project-box-wrapper">
      <div
        className="project-box"
        style={{ background: taskColor ? taskColor : "#c8f7dc" }}
      >
        <div className="project-box-header">
          <span>{taskCreatedAt}</span>
          <div className="more-wrapper">
            <button className="project-btn-more">
              <img src={MoreButton} />
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
            <img
              src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="participant"
            />
            <img
              src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
              alt="participant"
            />
            <button className="add-participant" style={{ color: "#096c86" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="days-left">end in 2 days</div>
        </div>
      </div>
    </div>
  );
};

export default TaskItems;
