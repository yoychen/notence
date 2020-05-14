import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Meta = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 3px;

  .meta-name {
    width: 150px;
    margin-right: 10px;
    font-size: 1.15em;
  }

  .meta-input {
    flex: 1;
  }
`;

export default function PageMeta({ meta, onMetaChange }) {
  const list = meta.map(({ MetaInput, propertyId, name, value }) => {
    const handleChange = (newValue) => onMetaChange(propertyId, newValue);

    return (
      <Meta key={propertyId}>
        <div className="meta-name">{name}</div>
        <div className="meta-input">
          <MetaInput onChange={handleChange} value={value} />
        </div>
      </Meta>
    );
  });

  return <div>{list}</div>;
}

PageMeta.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMetaChange: PropTypes.func.isRequired,
};
