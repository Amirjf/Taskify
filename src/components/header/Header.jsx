import React from "react";
import "./header.styles.scss";
import SectionHeading from "../section-heading/SectionHeading";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase.config";
import ThemeSelect from "../theme-select/ThemeSelect";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
const Header = ({ title }) => {
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

  return (
    <div className="header-container">
      <SectionHeading
        title={pathname !== "/" ? pathname.slice(1).toUpperCase() : "Dashboard"}
      />
      <div className="header-profile">
        <ThemeSelect />
        <button>
          <i className="gg-add"></i>
          New Task
        </button>
        <div className="avatar-container">
          <Link className="image-link-container" to={user ? "/" : "/auth"}>
            <img className="avatar" src={handleUserAvatar()} alt="avatar" />
            <span className="user-name-dropdown">
              {user ? user.displayName : null}
            </span>
          </Link>
        </div>
        {user ? (
          <div className="logout-container" onClick={logout}>
            <i className="gg-log-out"></i>
            <span className="dropdown">Logout</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
