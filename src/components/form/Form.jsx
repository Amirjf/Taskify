import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ children, ...otherProps }) => {
  return <form {...otherProps}>{children}</form>;
};

export default Form;
