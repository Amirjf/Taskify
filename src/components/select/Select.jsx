import React from "react";
const Select = React.forwardRef(
  (
    { name, label, errors, options, required, children, ...otherProps },
    ref
  ) => (
    <>
      <div className="select-container">
        <label>{label}</label>
        <select name={name} ref={ref} {...otherProps}>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
);

export default Select;
