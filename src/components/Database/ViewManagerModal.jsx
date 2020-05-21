import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Select as AntSelect, Button, Modal as AntModal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import InlineInput from "../InlineInput";
import { getViewNames } from "./Views";

const { Option } = AntSelect;

const Select = styled(AntSelect)`
  flex: 1;
`;

const ViewForm = styled.form`
  display: flex;
  align-items: center;
`;

const ViewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;

  &:hover {
    background: #e7e7e78c;
  }
`;

const NameInput = styled(InlineInput)`
  flex: 1;
`;

const DeleteBtn = styled(DeleteOutlined)`
  margin-left: 3px;
  cursor: pointer;
`;

const Modal = styled(AntModal)`
  .ant-modal-body {
    padding: 0;
  }
`;

function ViewManagerModal({ visible, onCancel, views, onCreate, onDelete, onRename }) {
  const [viewType, setViewType] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!viewType) {
      return;
    }

    onCreate({ name: "Untitled", type: viewType });
    setViewType(null);
  };

  const showDeleteBtn = () => views.length > 1;

  return (
    <Modal
      title="Manage views"
      onCancel={onCancel}
      visible={visible}
      footer={
        <ViewForm onSubmit={handleSubmit}>
          <Select value={viewType} onChange={setViewType}>
            {getViewNames().map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
          <Button htmlType="submit" size="small" type="link" icon={<PlusOutlined />}>
            Add a view
          </Button>
        </ViewForm>
      }
    >
      {views.map(({ name, id }) => (
        <ViewItem key={id}>
          <NameInput value={name} onChange={(value) => onRename(id, value)} />
          {showDeleteBtn() && <DeleteBtn onClick={() => onDelete(id)} />}
        </ViewItem>
      ))}
    </Modal>
  );
}

ViewManagerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  views: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default ViewManagerModal;
