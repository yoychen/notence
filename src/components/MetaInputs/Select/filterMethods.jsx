import React from "react";
import PropTypes from "prop-types";
import PropertyOptionsSelect from "../utils/PropertyOptionsSelect";

const contains = (value, args) => value === args[0];
contains.ArgsInput = ({ property, args, onChange }) => {
  const handleChange = (value) => onChange([value]);

  return <PropertyOptionsSelect value={args[0]} property={property} onChange={handleChange} />;
};
contains.ArgsInput.propTypes = {
  args: PropTypes.arrayOf(PropTypes.string).isRequired,
  property: PropTypes.shape({
    additional: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default {
  contains,
};
