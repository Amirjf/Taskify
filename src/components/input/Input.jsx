import React from "react";
import "./_input.scss";

const Input = ({ type, label, ...otherProps }) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input type={type} {...otherProps} />
    </div>
  );
};

export default Input;
