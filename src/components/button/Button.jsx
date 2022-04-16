import React from "react";
import { motion } from "framer-motion";
import "./_button.scss";
const Button = ({ children, icon, isGoogle, block, ...otherProps }) => {
  return (
    <button
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.9 }}
      className={`${isGoogle ? "google-button" : "custom-button"}  ${
        block ? "block" : ""
      } `}
      {...otherProps}
    >
      {icon ? <i className={`gg-${icon}`}></i> : null}
      {children}
    </button>
  );
};

export default Button;
