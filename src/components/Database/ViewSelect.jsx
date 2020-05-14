import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

const ViewsSelect = styled(Select)`
  width: 120px;
`;

function ViewSelect({ views, currentViewId, onChange }) {
  return (
    <ViewsSelect value={currentViewId} onChange={onChange}>
      {views.map((view) => (
        <Option value={view.id} key={view.id}>
          {view.name}
        </Option>
      ))}
    </ViewsSelect>
  );
}

ViewSelect.propTypes = {
  views: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentViewId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewSelect;
