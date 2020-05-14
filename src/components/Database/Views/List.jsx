import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";

export default function ListView({
  dataSource,
  onPageCreate,
  onPageSelect,
  filters,
  showProperties,
  sorts,
}) {
  const createEmptyPage = () => {
    onPageCreate({ title: "Untitled" });
  };

  return (
    <List
      itemLayout="horizontal"
      size="small"
      footer={
        <Button onClick={createEmptyPage} type="dashed">
          Create Page
        </Button>
      }
      dataSource={dataSource}
      renderItem={(page) => (
        <List.Item onClick={() => onPageSelect(page.id)}>
          <List.Item.Meta title={page.title} />
        </List.Item>
      )}
    />
  );
}

ListView.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  showProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
  sorts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageCreate: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};
