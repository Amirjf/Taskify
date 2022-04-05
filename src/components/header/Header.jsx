import React from "react";
import "./header.styles.scss";
import Avatar from "../../assets/images/mylogo.jpg";
import SectionHeading from "../section-heading/SectionHeading";
import { useLocation } from "react-router-dom";
import ThemeSelect from "../theme-select/ThemeSelect";
const Header = ({ title }) => {
  let { pathname } = useLocation();

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
        <img className="avatar" src={Avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
