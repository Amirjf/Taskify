import React from "react";
import Calendar from "react-calendar";
import "./calendar.styles.scss";
import "react-calendar/dist/Calendar.css";

const CalendarColumn = () => {
  return (
    <div className="calendar-container">
      <Calendar showNeighboringMonth={false} value={new Date()} />
    </div>
  );
};

export default CalendarColumn;
