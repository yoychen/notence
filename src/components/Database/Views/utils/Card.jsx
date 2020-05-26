import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  word-break: break-all;
  user-select: none;

  .title {
    margin: 0;
    margin-right: auto;
    padding-right: 1em;
    font-size: 14px;
  }

  .property-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .property {
      margin: 0 6px;
    }
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 8px;

    cursor: pointer;
    user-select: none;
  }
`;

const Card = ({ title, properties, onDelete, innerRef, ...rest }) => {
  const handleClick = (event) => {
    event.stopPropagation();

    onDelete();
  };

  const propertyList = (
    <div className="property-list">
      {properties.map(({ Display, property, value }) => (
        <div className="property" key={property.id}>
          <Display property={property} value={value} />
        </div>
      ))}
    </div>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CardWrapper ref={innerRef} {...rest}>
      <h2 className="title">{title}</h2>

      {propertyList}

      <DeleteOutlined className="delete-btn" onClick={handleClick} />
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
