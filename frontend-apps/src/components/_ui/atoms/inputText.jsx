import React from "react";
const Input = ({
  type = "text",
  name,
  className,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      className={`form-control ${className}`}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      readOnly={!onChange}
      {...props}
    />
  );
};

const InputTexarea = ({
  type = "text",
  name,
  className,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <textarea
      type={type}
      name={name}
      className={`form-control ${className}`}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      readOnly={!onChange}
      {...props}
    >
      {value || ""}
    </textarea>
  );
};

export { Input, InputTexarea };
