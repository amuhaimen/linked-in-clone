import React from "react";
import TextField from "@mui/material/TextField";

const InputBox = ({ label, variant, className, type, name, textChange }) => {
  return (
    <TextField
      onChange={textChange}
      name={name}
      type={type}
      className={className}
      label={label}
      variant={variant}
    />
  );
};

export default InputBox;
