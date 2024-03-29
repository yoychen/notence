import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Modal, notification } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import InlineInput from "../InlineInput";
import { getView } from "./Views";
import ViewSelect from "./ViewSelect";
import PropertiesDropdown from "./PropertiesDropdown";
import FiltersDropdown from "./FiltersDropdown";
import GroupByDropdown from "./GroupByDropdown";
import Page from "../Page/Page";
import {
  createPageInDatabase,
  deletePageInDatabase,
  createPropertyInDatabase,
  deletePropertyInDatabase,
  rename,
  createViewInDatabase,
  deleteViewInDatabase,
  initGroupBy,
} from "../../slices/databases";
import {
  toggleShowProperty,
  createFilter,
  updateFilter,
  deleteFilter,
  updateSequence,
  rename as renameView,
  updateGroupBy,
} from "../../slices/views";
import { updateMeta } from "../../slices/pages";
import devices from "../../utils/devices";

const DatabaseWrapper = styled.div`
  width: 100vw;
  padding: 35px 30px;
  padding-left: 55px;

  @media screen and ${devices.lg} {
    width: auto;
    padding: 35px 96px;
  }
`;

const Content = styled.div``;

const Title = styled.h1`
  font-size: 2.25em;
  margin-bottom: 1em;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .right {
    margin-left: auto;
  }
`;

const PageModal = styled(Modal)`
  min-width: 100%;

  @media screen and ${devices.lg} {
    min-width: 85vw;
  }
`;

function Database({
  name,
  pages,
  views,
  properties,
  onPageCreate,
  onPageDelete,
  onPageMetaChange,
  onPropertyCreate,
  onPropertyToggle,
  onPropertyDelete,
  onFilterCreate,
  onFilterChange,
  onFilterDelete,
  onSequenceChange,
  onRename,
  onViewCreate,
  onViewDelete,
  onViewRename,
  onGroupByInit,
  onGroupByChange,
}) {
  const [currentViewId, setCurrentViewId] = useState(views[0].id);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const currentView = views.find((view) => view.id === currentViewId);
  const DataView = getView(currentView.type);

  const resetSelectedPageId = () => {
    setSelectedPageId(null);
  };

  const handlePropertyToggle = (propertyId) => onPropertyToggle(currentViewId, propertyId);
  const handleFilterChange = (filterId, newFilter) =>
    onFilterChange(currentViewId, filterId, newFilter);
  const handleFilterCreate = () => onFilterCreate(currentViewId);
  const handleFilterDelete = (filterId) => onFilterDelete(currentViewId, filterId);
  const handleSequenceChange = (newSequence) => onSequenceChange(currentViewId, newSequence);
  const handleGroupByInit = () => onGroupByInit(currentViewId);
  const handleGroupByChange = (propertyId) => onGroupByChange(currentViewId, propertyId);

  const handlePageCreate = (page) => {
    if (currentView.filters.length > 0) {
      notification.open({
        icon: <InfoCircleTwoTone />,
        message: "The new created page may not be able to show on current filter rules.",
        duration: 8,
      });
    }
    onPageCreate(page);
  };

  return (
    <DatabaseWrapper>
      <Title>
        <InlineInput onChange={onRename} value={name} />
      </Title>
      <Toolbar>
        <ViewSelect
          views={views}
          currentViewId={currentViewId}
          onChange={setCurrentViewId}
          onCreate={onViewCreate}
          onDelete={onViewDelete}
          onRename={onViewRename}
        />

        <div className="right">
          <PropertiesDropdown
            onPropertyCreate={onPropertyCreate}
            properties={properties}
            showProperties={currentView.showProperties}
            onPropertyToggle={handlePropertyToggle}
            onPropertyDelete={onPropertyDelete}
          />
          <FiltersDropdown
            properties={properties}
            filters={currentView.filters}
            onFilterCreate={handleFilterCreate}
            onFilterChange={handleFilterChange}
            onFilterDelete={handleFilterDelete}
          />
          {currentView.type === "BoardView" && (
            <GroupByDropdown
              properties={properties}
              groupBy={currentView.groupBy}
              onGroupByChange={handleGroupByChange}
            />
          )}
        </div>
      </Toolbar>

      <Content>
        <DataView
          onPageSelect={setSelectedPageId}
          onPageCreate={handlePageCreate}
          onPageDelete={onPageDelete}
          onPageMetaChange={onPageMetaChange}
          onSequenceChange={handleSequenceChange}
          onGroupByInit={handleGroupByInit}
          dataSource={pages}
          filters={currentView.filters}
          showProperties={currentView.showProperties}
          sorts={currentView.sorts}
          sequence={currentView.sequence}
          groupBy={currentView.groupBy}
          properties={properties}
        />

        <PageModal visible={!!selectedPageId} onCancel={resetSelectedPageId} footer={null}>
          {selectedPageId && <Page pageId={selectedPageId} properties={properties} />}
        </PageModal>
      </Content>
    </DatabaseWrapper>
  );
}

Database.propTypes = {
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  views: PropTypes.arrayOf(PropTypes.object).isRequired,
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageCreate: PropTypes.func.isRequired,
  onPageDelete: PropTypes.func.isRequired,
  onPageMetaChange: PropTypes.func.isRequired,
  onPropertyCreate: PropTypes.func.isRequired,
  onPropertyToggle: PropTypes.func.isRequired,
  onPropertyDelete: PropTypes.func.isRequired,
  onFilterCreate: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterDelete: PropTypes.func.isRequired,
  onSequenceChange: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onViewCreate: PropTypes.func.isRequired,
  onViewDelete: PropTypes.func.isRequired,
  onViewRename: PropTypes.func.isRequired,
  onGroupByInit: PropTypes.func.isRequired,
  onGroupByChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { databaseId }) => ({
  id: databaseId,
  name: state.databases[databaseId].name,
  pages: state.databases[databaseId].pages.map((id) => state.pages[id]),
  views: state.databases[databaseId].views.map((id) => state.views[id]),
  properties: state.databases[databaseId].properties.map((id) => state.properties[id]),
});

const mapDispatchToProps = (dispatch, { databaseId }) => {
  return {
    onPageCreate: (page) => dispatch(createPageInDatabase(databaseId, page)),
    onPageDelete: (pageId) => dispatch(deletePageInDatabase(databaseId, pageId)),
    onPageMetaChange: (pageId, propertyId, value) =>
      dispatch(updateMeta({ pageId, propertyId, value })),
    onPropertyCreate: (property) => dispatch(createPropertyInDatabase(databaseId, property)),
    onPropertyToggle: (viewId, propertyId) => dispatch(toggleShowProperty({ viewId, propertyId })),
    onPropertyDelete: (propertyId) => dispatch(deletePropertyInDatabase(databaseId, propertyId)),
    onFilterCreate: (viewId) => dispatch(createFilter(viewId)),
    onFilterChange: (viewId, filterId, newFilter) =>
      dispatch(updateFilter({ viewId, filterId, newFilter })),
    onFilterDelete: (viewId, filterId) => dispatch(deleteFilter({ viewId, filterId })),
    onSequenceChange: (viewId, newSequence) => dispatch(updateSequence({ viewId, newSequence })),
    onRename: (newName) => dispatch(rename({ databaseId, newName })),
    onViewCreate: (view) => dispatch(createViewInDatabase(databaseId, view)),
    onViewDelete: (viewId) => dispatch(deleteViewInDatabase(databaseId, viewId)),
    onViewRename: (viewId, newName) => dispatch(renameView({ viewId, newName })),
    onGroupByInit: (viewId) => dispatch(initGroupBy(databaseId, viewId)),
    onGroupByChange: (viewId, propertyId) => dispatch(updateGroupBy({ viewId, propertyId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
