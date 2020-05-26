import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getDisplay } from "../../MetaInputs";
import Card from "./utils/Card";
import SortableBoard from "./utils/SortableBoard";
import filterPages from "./utils/filterPages";
import applySequence from "./utils/applySequence";
import groupPages from "./utils/groupPages";

const CreatePropertyBtn = styled(Button)`
  margin-top: 0.5em;
`;

const BoardCard = styled(Card)`
  margin-bottom: 8px;
  padding: 7px 12px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  .property-list {
    display: block;
    width: 100%;
    margin-top: 3px;

    .property {
      margin: 0;
    }
  }
`;

export default function BoardView({
  dataSource,
  onPageCreate,
  onPageDelete,
  onPageSelect,
  onPageMetaChange,
  onSequenceChange,
  onGroupByInit,
  filters,
  showProperties,
  sequence,
  properties,
  groupBy: { propertyId },
}) {
  const createPage = (groupId) => {
    onPageCreate({
      title: "Untitled",
      meta: {
        [propertyId]: groupId,
      },
    });
  };

  const getProperties = (pageMeta) =>
    properties
      .filter((property) => showProperties.indexOf(property.id) > -1)
      .filter((property) => pageMeta[property.id])
      .map((property) => ({
        Display: getDisplay(property.type),
        property,
        value: pageMeta[property.id],
      }));

  const pages = useMemo(
    () => applySequence(filterPages(dataSource, filters, properties), sequence),
    [dataSource, filters, properties, sequence]
  );

  const propertyToGroupBy = properties.find((property) => property.id === propertyId);

  const pageGroups = useMemo(() => groupPages(propertyToGroupBy, pages), [
    propertyToGroupBy,
    pages,
  ]);

  if (!propertyToGroupBy) {
    return (
      <div>
        <Alert message="Please select or create a property to group by" type="info" showIcon />
        <CreatePropertyBtn icon={<PlusOutlined />} type="link" onClick={onGroupByInit}>
          Create property
        </CreatePropertyBtn>
      </div>
    );
  }

  const handleBoardChange = ({ source, destination }) => {
    const [sourceGroupId, sourceIndex] = [source.droppableId, source.index];
    const [destinationGroupId, destinationIndex] = [destination.droppableId, destination.index];

    const targetPage = pageGroups[sourceGroupId].items[sourceIndex];
    pageGroups[sourceGroupId].items.splice(sourceIndex, 1);
    pageGroups[destinationGroupId].items.splice(destinationIndex, 0, targetPage);

    const newSequence = Object.values(pageGroups).reduce((seq, group) => {
      seq.push(...group.items.map((page) => page.id));
      return seq;
    }, []);

    onSequenceChange(newSequence);
    onPageMetaChange(targetPage.id, propertyToGroupBy.id, destinationGroupId);
  };

  return (
    <div>
      <SortableBoard groups={pageGroups} onChange={handleBoardChange} onItemCreate={createPage}>
        {(page, restProps) => (
          <BoardCard
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            onClick={() => onPageSelect(page.id)}
            title={page.title}
            properties={getProperties(page.meta)}
            onDelete={() => onPageDelete(page.id)}
          />
        )}
      </SortableBoard>
    </div>
  );
}

BoardView.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  showProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
  sorts: PropTypes.arrayOf(PropTypes.object).isRequired,
  sequence: PropTypes.arrayOf(PropTypes.string).isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupBy: PropTypes.shape({
    propertyId: PropTypes.string,
  }).isRequired,
  onPageCreate: PropTypes.func.isRequired,
  onPageDelete: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  onPageMetaChange: PropTypes.func.isRequired,
  onSequenceChange: PropTypes.func.isRequired,
  onGroupByInit: PropTypes.func.isRequired,
};
