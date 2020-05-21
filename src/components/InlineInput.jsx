import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function InlineInput({ tagName, className, value, onChange, multiLine }) {
  const input = useRef(null);

  const handleChange = () => {
    onChange(input.current.innerText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && multiLine === false) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (value !== input.current.innerText) {
      input.current.innerText = value;
    }
  }, [value]);

  return React.createElement(tagName, {
    ref: input,
    contentEditable: true,
    onKeyPress: handleKeyPress,
    onInput: handleChange,
    className,
  });
}

InlineInput.defaultProps = {
  tagName: "div",
  multiLine: false,
  className: "",
};

InlineInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tagName: PropTypes.string,
  multiLine: PropTypes.bool,
  className: PropTypes.string,
};
