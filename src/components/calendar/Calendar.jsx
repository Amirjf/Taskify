import React, { useContext } from "react";
import Calendar from "react-calendar";
import "./calendar.styles.scss";
import { motion } from "framer-motion";
import { FullScreenContext } from "../context/FullScreenContext";

import "react-calendar/dist/Calendar.css";

const CalendarColumn = () => {
  const { isFullScreen, toggle } = useContext(FullScreenContext);

  return (
    <motion.div
      layout
      className={`calendar-container ${isFullScreen ? "hide" : ""}`}
    >
      <Calendar showNeighboringMonth={false} value={new Date()} />
    </motion.div>
  );
};

export default CalendarColumn;
