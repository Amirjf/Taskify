import React from "react";
import "./_section_heading.scss";

const SectionHeading = ({ title, center }) => {
  return <h1 className={`title my-5 ${center && "mx-auto"}`}>{title}</h1>;
};

export default SectionHeading;
