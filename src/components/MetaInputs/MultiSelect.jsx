import React from "react";
import PropTypes from "prop-types";
import { Tag, Select } from "antd";
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

const contains = (value, args) => value.indexOf(args[0]) > -1;
contains.ArgsInput = ({
  property: {
    additional: { options },
  },
  args,
  onChange,
}) => {
  const { Option } = Select;

  const handleChange = (value) => onChange([value]);

  return (
    <Select size="small" style={{ minWidth: "100px" }} value={args[0]} onChange={handleChange}>
      {options.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
};
contains.ArgsInput.propTypes = {
  args: PropTypes.arrayOf(PropTypes.string).isRequired,
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

MultiSelect.filterMethods = {
  contains,
};

export default MultiSelect;
