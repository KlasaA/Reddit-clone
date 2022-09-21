import React from "react";

const Button = ({ type, className, label, onClick, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
