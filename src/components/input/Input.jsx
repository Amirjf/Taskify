import React from "react";
import "./_input.scss";

const Input = ({
  type = "text",
  label,
  registerLabel,
  register,
  errors,
  required,
  ...otherProps
}) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input
        type={type}
        className={`${errors[registerLabel] ? "error" : ""}`}
        {...register(registerLabel, { required })}
        {...otherProps}
      />
      {errors[registerLabel] && (
        <div className="error-message">This field is required !</div>
      )}
    </div>
  );
};

export default Input;
