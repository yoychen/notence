import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List, Button } from "antd";

const Property = styled.div`
  margin: 0 6px;
`;

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

  const getProperties = (pageMeta) =>
    Object.keys(pageMeta)
      .filter((propertyId) => showProperties.indexOf(propertyId) > -1)
      .map((propertyId) => ({
        id: propertyId,
        value: pageMeta[propertyId],
      }));

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
          {getProperties(page.meta).map(({id, value}) => (
            <Property key={id}>{value}</Property>
          ))}
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
