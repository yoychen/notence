import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";
import SelectWithOptionManager from "./utils/SelectWithOptionManager";

function Select({ value, onChange, additional, onAdditionalChange }) {
  return (
    <SelectWithOptionManager
      value={value}
      additional={additional}
      onChange={onChange}
      onAdditionalChange={onAdditionalChange}
    />
  );
}

Select.defaultValue = "";
Select.defaultAdditional = {
  options: [],
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

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
Select.Display = Display;

Select.filterMethods = {};

export default Select;
