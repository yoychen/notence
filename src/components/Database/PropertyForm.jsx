import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { getInputNames } from "../MetaInputs";

const { Option } = Select;

function PropertyForm({ onFinish }) {
  const form = useRef(null);

  const handleFormFinish = (value) => {
    onFinish(value);
    form.current.resetFields();
  };

  return (
    <Form ref={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} onFinish={handleFormFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name of property!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please input the type of property!" }]}
      >
        <Select style={{ width: "100%" }}>
          {getInputNames().map((inputName) => (
            <Option key={inputName} value={inputName}>
              {inputName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { offset: 0 },
          sm: { offset: 5 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

PropertyForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default PropertyForm;
