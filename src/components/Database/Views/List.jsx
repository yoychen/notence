import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { getDisplay } from "../../MetaInputs";
import Card from "./utils/Card";
import SortableList from "./utils/SortableList";
import filterPages from "./utils/filterPages";
import applySequence from "./utils/applySequence";

const CreateBtn = styled(Button)`
  margin-top: 1.25em;
`;

export default function ListView({
  dataSource,
  onPageCreate,
  onPageSelect,
  onSequenceChange,
  filters,
  showProperties,
  sequence,
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
        Display: getDisplay(property.type),
        property,
        value: pageMeta[property.id],
      }));

  const pages = useMemo(
    () => applySequence(filterPages(dataSource, filters, properties), sequence),
    [dataSource, filters, properties, sequence]
  );

  const updateSequence = ({ startIndex, endIndex }) => {
    const newSequence = pages.map((page) => page.id);

    const droppedPageId = newSequence[startIndex];
    newSequence.splice(startIndex, 1);
    newSequence.splice(endIndex, 0, droppedPageId);

    onSequenceChange(newSequence);
  };

  return (
    <div>
      <SortableList items={pages} onSort={updateSequence}>
        {(page, restProps) => (
          <Card
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            onClick={() => onPageSelect(page.id)}
            title={page.title}
            properties={getProperties(page.meta)}
          />
        )}
      </SortableList>

      {pages.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Button onClick={createEmptyPage}>Create Now</Button>
        </Empty>
      ) : (
        <CreateBtn onClick={createEmptyPage} type="dashed">
          Create Page
        </CreateBtn>
      )}
    </div>
  );
}

ListView.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  showProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
  sorts: PropTypes.arrayOf(PropTypes.object).isRequired,
  sequence: PropTypes.arrayOf(PropTypes.string).isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageCreate: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  onSequenceChange: PropTypes.func.isRequired,
};
