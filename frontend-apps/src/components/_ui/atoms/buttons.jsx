import React from "react";

const Button = ({
  children,
  type = "button",
  className,
  onClick,
  outline,
  ...props
}) => {
  const buttonClass = outline
    ? `btn btn-outline-${className?.replace("btn-", "") || "primary"}`
    : `btn ${className || ""}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export { Button };
