import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Menu, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterInput from "./FilterInput";

function FiltersDropdown({ properties, filters, onFilterCreate, onFilterChange, onFilterDelete }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filterList = filters.map((filter) => (
    <FilterInput
      key={filter.id}
      filter={filter}
      onChange={(newFilter) => onFilterChange(filter.id, newFilter)}
      onDelete={() => onFilterDelete(filter.id)}
      properties={properties}
    />
  ));

  const menu = (
    <Menu>
      {filterList}

      <Menu.Divider />
      <Menu.Item>
        <Button onClick={onFilterCreate} size="small" type="default" icon={<PlusOutlined />}>
          Add a filter
        </Button>
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
        Filter
      </Button>
    </Dropdown>
  );
}

FiltersDropdown.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterCreate: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterDelete: PropTypes.func.isRequired,
};

export default FiltersDropdown;
