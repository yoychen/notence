import React from "react";
import PropTypes from "prop-types";
import SelectWithOptionManager from "../utils/SelectWithOptionManager";
import Display from "./Display";
import filterMethods from "./filterMethods";

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

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

Select.defaultValue = "";
Select.defaultAdditional = {
  options: [],
};
Select.Display = Display;
Select.filterMethods = filterMethods;

export default Select;
