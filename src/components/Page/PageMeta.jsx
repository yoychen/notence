import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getInput } from "../MetaInputs";
import devices from "../../utils/devices";

const Meta = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 3px;

  .meta-name {
    width: 80px;
    margin-right: 10px;
    font-size: 1.15em;

    @media screen and ${devices.lg} {
      width: 150px;
    }
  }

  .meta-input {
    flex: 1;
  }
`;

export default function PageMeta({ meta, onMetaChange, onAdditionalChange }) {
  const list = meta.map(({ property: { id, name, additional, type }, value }) => {
    const handleChange = (newValue) => onMetaChange(id, newValue);
    const handleAdditionChange = (additionalChange) => onAdditionalChange(id, additionalChange);

    const MetaInput = getInput(type);

    return (
      <Meta key={id}>
        <div className="meta-name">{name}</div>
        <div className="meta-input">
          <MetaInput
            onChange={handleChange}
            value={value}
            additional={additional}
            onAdditionalChange={handleAdditionChange}
          />
        </div>
      </Meta>
    );
  });

  return <div>{list}</div>;
}

PageMeta.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMetaChange: PropTypes.func.isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};
