import React from "react";
import { motion } from "framer-motion";
import "./_button.scss";
const Button = ({ children, icon, ...otherProps }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="custom-button"
      {...otherProps}
    >
      {icon ? <i className={`gg-${icon}`}></i> : null}
      {children}
    </motion.button>
  );
};

export default Button;
