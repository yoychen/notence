import React from "react";
import PropTypes from "prop-types";
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

export default MultiSelect;
