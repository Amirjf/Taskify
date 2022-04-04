import React from "react";
import { motion } from "framer-motion";

const ToDoItems = ({ items, onRemoveItem }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <>
          <li className="list-items" variant="dark" key={index}>
            {`${index + 1} : ${item}`}
          </li>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
            onClick={() => onRemoveItem(item)}
            className="submit-btn"
          >
            Delete
          </motion.button>
        </>
      ))}
    </ul>
  );
};

export default ToDoItems;
