import React from "react";
import PropTypes from "prop-types";
import SelectWithOptionManager from "../utils/SelectWithOptionManager";
import Display from "./Display";
import filterMethods from "./filterMethods";

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

MultiSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

MultiSelect.defaultValue = [];
MultiSelect.defaultAdditional = {
  options: [],
};
MultiSelect.Display = Display;
MultiSelect.filterMethods = filterMethods;

export default MultiSelect;
