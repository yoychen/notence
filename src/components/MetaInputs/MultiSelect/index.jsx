import React from "react";
import PropTypes from "prop-types";
import SelectWithOptionManager from "../utils/SelectWithOptionManager";
import Display from "./Display";
import filterMethods from "./filterMethods";

function MultiSelect({ value, onChange, additional, additional: { options }, onAdditionalChange }) {
  const isValid = (optionId) => options.findIndex((option) => option.id === optionId) > -1;
  const validValue = value.filter(isValid);

  return (
    <SelectWithOptionManager
      mode="multiple"
      value={validValue}
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
