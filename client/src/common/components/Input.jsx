import React from "react";

const Input = ({ onChange, className, type, placeholder, id, label }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        id={id}
        className={className}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
