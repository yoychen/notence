import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";
import SelectWithOptionManager from "./utils/SelectWithOptionManager";

function MultiSelect({ value, onChange, additional, onAdditionalChange }) {
  return (
    <SelectWithOptionManager
      mode="multiple"
      value={value}
      additional={additional}
      onChange={onChange}
      onAdditionalChange={onAdditionalChange}
    />
  );
}

MultiSelect.defaultValue = [];
MultiSelect.defaultAdditional = {
  options: [],
};

MultiSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
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
MultiSelect.Display = Display;

export default MultiSelect;
