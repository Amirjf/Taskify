import React from "react";
import "./_sidebar.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/mylogo.png";
const Sidebar = () => {
  let { pathname } = useLocation();

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="sidebar-logo">
          <img src={Logo} alt="logo" />
        </div>
      </Link>

      <ul className="sidebar-navs">
        <li>
          <NavLink to="/" className="nav-NavLink">
            <i className="gg-home nav-icon"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" className="nav-link">
            <i className="gg-calendar nav-icon"></i>
            <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/activity" className="nav-link">
            <i className="gg-arrow-top-right-r nav-icon"></i>
            <span>Activity</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" className="nav-link">
            <i className="gg-comment nav-icon"></i>
            <span>Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/plan" className="nav-link">
            <i className="gg-ghost nav-icon"></i>
            <span>Project Plan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting" className="nav-link">
            <i className="gg-media-live nav-icon"></i>
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
