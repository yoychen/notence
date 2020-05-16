import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Modal, Button, Menu, Dropdown } from "antd";
import Views from "./Views";
import ViewSelect from "./ViewSelect";
import PropertiesDropdown from "./PropertiesDropdown";
import Page from "../Page/Page";
import { createPageInDatabase, createPropertyInDatabase } from "../../slices/databases";
import { toggleShowProperty } from "../../slices/views";

const DatabaseWrapper = styled.div`
  padding: 35px 96px;
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

const menu = (
  <Menu>
    <Menu.Item key="0">1st menu item</Menu.Item>
    <Menu.Item key="1">2nd menu item</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

function Database({
  name,
  pages,
  views,
  properties,
  onPageCreate,
  onPropertyCreate,
  onPropertyToggle,
}) {
  const [currentViewId, setCurrentViewId] = useState(views[0].id);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const currentView = views.find((view) => view.id === currentViewId);
  const DataView = Views[currentView.type];

  const resetSelectedPageId = () => {
    setSelectedPageId(null);
  };

  const handlePropertyToggle = (propertyId) => onPropertyToggle(currentViewId, propertyId);

  return (
    <DatabaseWrapper>
      <Title>{name}</Title>
      <Toolbar>
        <ViewSelect views={views} currentViewId={currentViewId} onChange={setCurrentViewId} />

        <div className="right">
          <PropertiesDropdown
            onPropertyCreate={onPropertyCreate}
            properties={properties}
            showProperties={currentView.showProperties}
            onPropertyToggle={handlePropertyToggle}
          />
          <Dropdown key="filter" overlay={menu} trigger={["click"]}>
            <Button size="small" type="link">
              Filter
            </Button>
          </Dropdown>
          <Dropdown key="sort" overlay={menu} trigger={["click"]}>
            <Button size="small" type="link">
              Sort
            </Button>
          </Dropdown>
        </div>
      </Toolbar>

      <Content>
        <DataView
          onPageSelect={setSelectedPageId}
          onPageCreate={onPageCreate}
          dataSource={pages}
          filters={currentView.filters}
          showProperties={currentView.showProperties}
          sorts={currentView.sorts}
          properties={properties}
        />

        <Modal width="85vw" visible={!!selectedPageId} onCancel={resetSelectedPageId} footer={null}>
          {selectedPageId && <Page pageId={selectedPageId} properties={properties} />}
        </Modal>
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
  onPropertyCreate: PropTypes.func.isRequired,
  onPropertyToggle: PropTypes.func.isRequired,
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
    onPropertyCreate: (property) => dispatch(createPropertyInDatabase(databaseId, property)),
    onPropertyToggle: (viewId, propertyId) => dispatch(toggleShowProperty({ viewId, propertyId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
