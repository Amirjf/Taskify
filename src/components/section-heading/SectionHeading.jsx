import React from "react";
import "./_section_heading.scss";

const SectionHeading = ({ title, center, textColor }) => {
  return (
    <h1
      style={{ color: textColor && textColor }}
      className={`section-title my-2 ${center && "text-center mx-auto"}`}
    >
      {title}
    </h1>
  );
};

export default SectionHeading;
