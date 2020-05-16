import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

const Display = ({
  property: {
    additional: { options },
  },
  value,
}) => {
  const { color, name } = options.find((option) => value === option.id);

  return <Tag color={color}>{name}</Tag>;
};
Display.propTypes = {
  value: PropTypes.string.isRequired,
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
};

export default Display;
