import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select as AntSelect } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getFilterMethods } from "../MetaInputs";

const { Option } = AntSelect;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Select = styled(AntSelect)`
  min-width: 100px;

  & + & {
    margin-left: 3px;
  }
`;

const ArgsInputWrapper = styled.div`
  margin-left: 3px;
`;

const DeleteBtn = styled(DeleteOutlined)`
  margin-left: 6px;
  cursor: pointer;
`;

function FilterInput({
  properties,
  filter,
  filter: { propertyId, method, args },
  onChange,
  onDelete,
}) {
  const selectedProperty = properties.find((property) => property.id === propertyId);
  const filterMethods = selectedProperty ? getFilterMethods(selectedProperty.type) : {};
  const ArgsInput = method && filterMethods[method].ArgsInput;

  const handlePropertyChange = (selectedPropertyId) => {
    onChange({
      ...filter,
      propertyId: selectedPropertyId,
      method: null,
      args: [],
    });
  };

  const handleMethodChange = (selectedMethod) => {
    onChange({
      ...filter,
      method: selectedMethod,
      args: [],
    });
  };

  const handleArgsChange = (newArgs) => {
    onChange({
      ...filter,
      args: newArgs,
    });
  };

  return (
    <InputWrapper>
      <Select size="small" value={propertyId} onChange={handlePropertyChange}>
        {properties.map(({ name, id }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>

      <Select size="small" value={method} onChange={handleMethodChange}>
        {Object.keys(filterMethods).map((name) => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>

      {ArgsInput && (
        <ArgsInputWrapper>
          <ArgsInput args={args} onChange={handleArgsChange} property={selectedProperty} />
        </ArgsInputWrapper>
      )}

      <DeleteBtn onClick={onDelete} />
    </InputWrapper>
  );
}

FilterInput.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.shape({
    propertyId: PropTypes.string,
    method: PropTypes.string,
    args: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FilterInput;
