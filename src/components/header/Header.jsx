import React from "react";
import SectionHeading from "../section-heading/SectionHeading";
import { Link, useLocation } from "react-router-dom";
import ThemeSelect from "../theme-select/ThemeSelect";
import { auth, logout } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./header.styles.scss";

import Button from "../button/Button";
const Header = () => {
  let { pathname } = useLocation();
  const [user] = useAuthState(auth);

  const handleUserAvatar = () => {
    if (user === null) {
      return "https://www.iranhotels.com/assets/img/admin.png";
    }
    if (user && user.photoURL) {
      return user.photoURL;
    }
    return "https://www.iranhotels.com/assets/img/admin.png";
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    await logout();
  };

  return (
    <div className="header-container">
      <SectionHeading
        title={pathname !== "/" ? pathname.slice(1).toUpperCase() : "Dashboard"}
      />
      <div className="header-profile">
        <ThemeSelect />

        <Link to="/tasks">
          <Button className="new-task-btn" icon="add">
            New Task
          </Button>
        </Link>

        <div className="avatar-container">
          <Link className="image-link-container" to={user ? "/" : "/auth"}>
            <img className="avatar" src={handleUserAvatar()} alt="avatar" />
            <span className="user-name-dropdown">
              {user ? user.displayName : ""}
            </span>
          </Link>
        </div>
        {user ? (
          <div className="logout-container" onClick={signOut}>
            <i className="gg-log-off"></i>
            <span className="dropdown">Logout</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
