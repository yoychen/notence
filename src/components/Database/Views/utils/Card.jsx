import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

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

const DeleteBtn = styled(DeleteOutlined)`
  cursor: pointer;
  user-select: none;
`;

const Card = ({ title, properties, onDelete, innerRef, ...rest }) => {
  const handleClick = (event) => {
    event.stopPropagation();

    onDelete();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CardWrapper ref={innerRef} {...rest}>
      <h2 className="title">{title}</h2>

      {properties.map(({ Display, property, value }) => (
        <Property key={property.id}>
          <Display property={property} value={value} />
        </Property>
      ))}

      <DeleteBtn className="delete-btn" onClick={handleClick} />
    </CardWrapper>
  );
};

Card.defaultProps = {
  innerRef: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default Card;
