import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SettingOutlined } from "@ant-design/icons";
import { Select as AntSelect, Divider, Button } from "antd";
import ViewManagerModal from "./ViewManagerModal";

const { Option } = AntSelect;

const ViewsSelect = styled(AntSelect)`
  width: 130px;
`;

function ViewSelect({ views, currentViewId, onChange, onCreate, onDelete, onRename }) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleViewDelete = (viewId) => {
    if (viewId === currentViewId) {
      const otherView = views.find((view) => view.id !== viewId);
      onChange(otherView.id);
    }

    onDelete(viewId);
  };

  return (
    <ViewsSelect
      value={currentViewId}
      disabled={modalVisible}
      onChange={onChange}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: "4px 0" }} />

          <Button onClick={openModal} size="small" type="link" icon={<SettingOutlined />}>
            Manage views
          </Button>

          <ViewManagerModal
            onCreate={onCreate}
            onDelete={handleViewDelete}
            onRename={onRename}
            visible={modalVisible}
            views={views}
            onCancel={closeModal}
          />
        </div>
      )}
    >
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
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ViewSelect;
