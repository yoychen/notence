import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

const Display = ({
  property: {
    additional: { options },
  },
  value,
}) => {
  const selectedOptions = options.filter((option) => value.indexOf(option.id) > -1);

  return selectedOptions.map((option) => (
    <Tag key={option.id} color={option.color}>
      {option.name}
    </Tag>
  ));
};
Display.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
};

export default Display;
