import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

const Display = ({
  property: {
    additional: { options },
  },
  value,
}) => {
  const selectedOption = options.find((option) => value === option.id);
  if (!selectedOption) {
    return null;
  }

  return <Tag color={selectedOption.color}>{selectedOption.name}</Tag>;
};
Display.propTypes = {
  value: PropTypes.string.isRequired,
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
};

export default Display;
