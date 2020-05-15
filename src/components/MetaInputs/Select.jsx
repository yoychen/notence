import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select as AntSelect, Divider, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import OptionManagerModal from "./utils/OptionManagerModal";

const { Option } = AntSelect;

const SelectInput = styled(AntSelect)`
  width: 100%;

  &:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    border-bottom: 1px dashed black;
    border-radius: 0;

    &:focus,
    &:hover {
      border-color: black;
    }
  }
`;

function Select({ value, onChange, additional: { options }, onAdditionalChange }) {
  const [optionManagerVisible, setOptionManagerVisible] = useState(false);
  const openModal = () => setOptionManagerVisible(true);
  const closeModal = () => setOptionManagerVisible(false);

  const updateOptions = (newOptions) => {
    onAdditionalChange({ options: newOptions });
  };

  return (
    <SelectInput
      placeholder="Empty"
      disabled={optionManagerVisible}
      value={value}
      onChange={onChange}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: "4px 0" }} />

          <Button onClick={openModal} size="small" type="link" icon={<SettingOutlined />}>
            Manage options
          </Button>

          <OptionManagerModal
            visible={optionManagerVisible}
            options={options}
            onCancel={closeModal}
            onChange={updateOptions}
          />
        </div>
      )}
    >
      {options.map(({ name, id }) => (
        <Option value={id} key={id}>
          {name}
        </Option>
      ))}
    </SelectInput>
  );
}

Select.defaultValue = "";
Select.defaultAdditional = {
  options: [],
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

export default Select;
