import React from "react";
import { motion } from "framer-motion";
import "./_input.scss";
const Input = ({ type, handleChange, ...otherProps }) => {
  return (
    <motion.input
      whileTap={{ scale: 0.99 }}
      type={type}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default Input;
