import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Menu, Dropdown } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const PropertyItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  min-width: 130px;

  .name {
    margin-right: auto;
    padding-right: 1em;
  }
`;

function GroupByDropdown({ properties, groupBy: { propertyId }, onGroupByChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectTypeProprties = properties.filter((property) => property.type === "Select");
  const propertyList = selectTypeProprties.map((property) => (
    <PropertyItem key={property.id} onClick={() => onGroupByChange(property.id)}>
      <span className="name">{property.name}</span>
      {property.id === propertyId && <CheckOutlined />}
    </PropertyItem>
  ));

  const menu = <Menu>{propertyList}</Menu>;

  return (
    <Dropdown
      visible={dropdownVisible}
      onVisibleChange={setDropdownVisible}
      overlay={menu}
      trigger={["click"]}
    >
      <Button size="small" type="link">
        Group by
      </Button>
    </Dropdown>
  );
}

GroupByDropdown.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupBy: PropTypes.shape({
    propertyId: PropTypes.string,
  }).isRequired,
  onGroupByChange: PropTypes.func.isRequired,
};

export default GroupByDropdown;
