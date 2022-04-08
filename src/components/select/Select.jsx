import React from "react";
const Select = React.forwardRef(
  ({ onChange, onBlur, name, label, children }, ref) => (
    <>
      <div className="select-container">
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {children}
        </select>
      </div>
    </>
  )
);

export default Select;
