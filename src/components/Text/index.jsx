import React from "react";

const sizes = {
  lg: "text-sm font-normal",
  s: "text-xs font-normal",
  "2xl": "text-base font-normal",
};

const Text = ({ children, className = "", as, size = "lg", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900_01 font-roboto ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
