import React from "react";

const Label = ({ children, htmlFor, ...props }) => {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

const Text = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};

const Heading = ({ level = 1, children, ...props }) => {
  const Tag = `h${level}`;
  return <Tag {...props}>{children}</Tag>;
};

const Icon = ({ name, size = "1em", className = "", ...props }) => {
  return (
    <i
      className={`bi bi-${name} ${className}`}
      style={{ fontSize: size }}
      {...props}
    ></i>
  );
};

export { Label, Text, Heading, Icon };
