import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

const PropertyOptionsSelect = ({
  property: {
    additional: { options },
  },
  onChange,
  value,
}) => {
  return (
    <Select size="small" style={{ minWidth: "100px" }} value={value} onChange={onChange}>
      {options.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
};
PropertyOptionsSelect.defaultProps = {
  value: null,
};
PropertyOptionsSelect.propTypes = {
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default PropertyOptionsSelect;
