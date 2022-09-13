import React from "react";

const Input = ({
  placeholder,
  className,
  onChange,
  value,
  label,
  type,
  id,
  readOnly,
  passDownRef,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        readOnly={readOnly}
        ref={passDownRef}
      />
    </>
  );
};

export default Input;
