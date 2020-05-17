import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Modal as AntModal, Input, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import createOption from "./createOption";

const OptionForm = styled.form`
  display: flex;
  align-items: center;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;

  &:hover {
    background: #e7e7e78c;
  }
`;

const DeleteBtn = styled(DeleteOutlined)`
  cursor: pointer;
`;

const Modal = styled(AntModal)`
  .ant-modal-body {
    padding: 0;
  }
`;

function OptionManagerModal({ visible, onCancel, options, onChange }) {
  const optionInput = useRef(null);

  const addOption = () => {
    const optionName = optionInput.current.state.value;
    const hasDuplicated = !!options.find((option) => option.name === optionName);

    if (optionName === "" || hasDuplicated) {
      return;
    }

    const newOption = createOption(optionName);
    onChange([...options, newOption]);
    optionInput.current.state.value = "";
  };

  const removeOption = (optionId) => {
    const newOptions = options.filter((option) => option.id !== optionId);

    onChange(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addOption();
  };

  return (
    <Modal
      title="Manage options"
      onCancel={onCancel}
      visible={visible}
      footer={
        <OptionForm onSubmit={handleSubmit}>
          <Input ref={optionInput} />
          <Button htmlType="submit" size="small" type="link" icon={<PlusOutlined />}>
            Add a option
          </Button>
        </OptionForm>
      }
    >
      {options.map(({ name, id }) => (
        <OptionItem key={id}>
          <Tag>{name}</Tag> <DeleteBtn onClick={() => removeOption(id)} />
        </OptionItem>
      ))}
    </Modal>
  );
}

OptionManagerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OptionManagerModal;
