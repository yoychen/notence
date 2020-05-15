import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal, Switch, Button, Menu, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropertyForm from "./PropertyForm";

const PropertyItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    margin-right: 6px;
  }
`;

function PropertiesDropdown({ showProperties, properties, onPropertyCreate, onPropertyToggle }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const inShowProperties = (propertyId) => showProperties.indexOf(propertyId) > -1;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handlePropertyFormFinish = (property) => {
    onPropertyCreate(property);
    closeModal();
  };

  const createPropertyModal = (
    <Modal title="Create property" visible={modalVisible} onCancel={closeModal} footer={null}>
      <PropertyForm onFinish={handlePropertyFormFinish} />
    </Modal>
  );

  const propertyList = properties.map((property) => (
    <PropertyItem key={property.id}>
      <span className="name">{property.name}</span>
      <Switch
        size="small"
        onChange={() => onPropertyToggle(property.id)}
        checked={inShowProperties(property.id)}
      />
    </PropertyItem>
  ));

  const menu = (
    <Menu>
      {propertyList}

      <Menu.Divider />
      <Menu.Item>
        <Button onClick={openModal} size="small" type="default" icon={<PlusOutlined />}>
          Add a property
        </Button>

        {createPropertyModal}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      visible={dropdownVisible}
      onVisibleChange={setDropdownVisible}
      overlay={menu}
      trigger={["click"]}
    >
      <Button size="small" type="link">
        Properties
      </Button>
    </Dropdown>
  );
}

PropertiesDropdown.propTypes = {
  showProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPropertyCreate: PropTypes.func.isRequired,
  onPropertyToggle: PropTypes.func.isRequired,
};

export default PropertiesDropdown;
