import React from "react";
import "./header.styles.scss";
import Avatar from "../../assets/images/mylogo.jpg";
import SectionHeading from "../section-heading/SectionHeading";
import ThemeSelect from "../theme-select/ThemeSelect";
const Header = ({ title }) => {
  return (
    <div className="header_container">
      <SectionHeading title="Dashboard" />
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
