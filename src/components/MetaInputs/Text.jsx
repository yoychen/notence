import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";

const TextInput = styled(Input)`
  border: none;
  border-bottom: 1px dashed black;
  border-radius: 0;

  &:focus,
  &:hover {
    border-color: black;
  }
`;

function Text({ value, onChange }) {
  const handleChange = (event) => onChange(event.target.value);

  return (
    <div>
      <TextInput placeholder="Empty" value={value} onChange={handleChange} />
    </div>
  );
}

Text.defaultValue = "";

Text.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Text;
