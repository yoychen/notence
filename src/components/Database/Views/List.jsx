import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List, Button } from "antd";
import metaInputs from '../../MetaInputs';

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
  properties,
}) {
  const createEmptyPage = () => {
    onPageCreate({ title: "Untitled" });
  };

  const getProperties = (pageMeta) =>
    properties
      .filter((property) => showProperties.indexOf(property.id) > -1)
      .filter((property) => pageMeta[property.id])
      .map((property) => ({
        Display: metaInputs[property.type].Display,
        property,
        value: pageMeta[property.id],
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
          {getProperties(page.meta).map(({ Display, property, value }) => (
            <Property key={property.id}>
              <Display property={property} value={value} />
            </Property>
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
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageCreate: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};