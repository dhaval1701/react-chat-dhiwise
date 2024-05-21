import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[20px]",
};
const variants = {
  fill: {
    gray_200: "bg-gray-200 text-black-900_01",
  },
  outline: {
    gray_300_01: "border-gray-300_01 border border-solid",
  },
};
const sizes = {
  lg: "h-[46px] pl-[17px] pr-[35px] text-sm",
  md: "h-[44px] pl-5 pr-[35px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "lg",
      color = "",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <label
          className={`${className} flex items-center justify-center cursor-text border border-solid rounded-[22px]  ${
            (shape && shapes[shape]) || ""
          } ${variants[variant]?.[color] || variants[variant] || ""} ${
            sizes[size] || ""
          }`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </label>
      </>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["lg", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["gray_200", "gray_300_01"]),
};

export { Input };
