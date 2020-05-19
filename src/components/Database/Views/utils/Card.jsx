import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Property = styled.div`
  margin: 0 6px;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;

  .title {
    margin: 0;
    margin-right: auto;
    font-size: 14px;
  }
`;

const Card = ({ title, properties, innerRef, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CardWrapper ref={innerRef} {...rest}>
    <h2 className="title">{title}</h2>

    {properties.map(({ Display, property, value }) => (
      <Property key={property.id}>
        <Display property={property} value={value} />
      </Property>
    ))}
  </CardWrapper>
);

Card.defaultProps = {
  innerRef: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default Card;
