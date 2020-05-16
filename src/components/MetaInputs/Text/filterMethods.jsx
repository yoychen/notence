import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const contains = (value, args) => value.search(args[0]) > -1;
contains.ArgsInput = ({ args, onChange }) => {
  const handleChange = (event) => onChange([event.target.value]);

  return <Input size="small" value={args[0]} onChange={handleChange} />;
};
contains.ArgsInput.propTypes = {
  args: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default {
  contains,
};
