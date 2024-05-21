import React from "react";

const sizes = {
  md: "text-sm font-semibold",
  lg: "text-base font-semibold",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900_01 font-roboto ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
