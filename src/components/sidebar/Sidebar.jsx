import React, { useContext } from "react";
import { FullScreenContext } from "../../context/FullScreenContext";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/mylogo.png";
import "./_sidebar.scss";
import { auth, logout } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const { isFullScreen, setIsFullScreen } = useContext(FullScreenContext);

  const [user] = useAuthState(auth);

  const signOut = async () => {
    localStorage.removeItem("user");
    await logout();
  };
  return (
    <>
      <motion.div layout className={`sidebar ${isFullScreen ? "hide" : ""}`}>
        <div className="sidebar-header">
          <div
            className="toggle-sidebar"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            <i className="gg-menu-round"></i>
          </div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <ul className="sidebar-navs">
          <li>
            <NavLink to="/" className="nav-NavLink">
              <i className="gg-home nav-icon"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className="nav-link">
              <i className="gg-calendar nav-icon"></i>
              <span>Tasks</span>
            </NavLink>
          </li>
          {user ? (
            <li onClick={signOut}>
              <NavLink to="/" className="nav-link sign-out">
                <i className="gg-log-off nav-icon"></i>
                <span>Log Out</span>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/auth" className="nav-link">
                <i className="gg-log-in nav-icon"></i>
                <span>Sign In/Out</span>
              </NavLink>
            </li>
          )}
          {/* <li>
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
          </li> */}
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
