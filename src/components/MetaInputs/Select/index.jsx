import React from "react";
import PropTypes from "prop-types";
import SelectWithOptionManager from "../utils/SelectWithOptionManager";
import Display from "./Display";
import filterMethods from "./filterMethods";

function Select({ value, onChange, additional, additional: { options }, onAdditionalChange }) {
  const isValueValid = options.findIndex((option) => option.id === value) > -1;

  return (
    <SelectWithOptionManager
      value={isValueValid ? value : Select.defaultValue}
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
