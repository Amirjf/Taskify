import React from "react";
import "./_sidebar.scss";
import Logo from "../../assets/images/mylogo.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul className="sidebar-navs">
        <li>
          <a className="nav-link active" href="#">
            <i className="gg-home nav-icon"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="#">
            <i className="gg-calendar nav-icon"></i>
            <span>Calendar</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="#">
            <i className="gg-arrow-top-right-r nav-icon"></i>
            <span>Activity</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="#">
            <i className="gg-comment nav-icon"></i>
            <span>Messages</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="#">
            <i className="gg-ghost nav-icon"></i>
            <span>Project Plan</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="#">
            <i className="gg-media-live nav-icon"></i>
            <span>Setting</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
