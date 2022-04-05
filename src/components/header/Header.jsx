import React from "react";
import "./header.styles.scss";
import Avatar from "../../assets/images/mylogo.jpg";
import SectionHeading from "../section-heading/SectionHeading";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase.config";
import ThemeSelect from "../theme-select/ThemeSelect";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import Button from "../button/Button";
const Header = ({ title }) => {
  let { pathname } = useLocation();
  const [user] = useAuthState(auth);
  const userInfo = user;
  console.log(userInfo);

  return (
    <div className="header_container">
      <SectionHeading
        title={pathname !== "/" ? pathname.slice(1).toUpperCase() : "Dashboard"}
      />
      <div className="header_profile">
        <ThemeSelect />
        <button>
          <i className="gg-add"></i>
          New Task
        </button>
        <span className="user-name">{user ? user.displayName : null}</span>
        <Link to="/auth">
          <img
            className="avatar"
            src={
              user
                ? user.photoURL
                : "https://www.iranhotels.com/assets/img/admin.png"
            }
            alt="avatar"
          />
        </Link>
        <div className="logout-container" onClick={logout}>
          <i className="gg-log-out"></i>
          <span className="dropdown">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
