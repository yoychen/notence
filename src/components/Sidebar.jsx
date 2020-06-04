import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Layout } from "antd";
import { AppstoreAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { createDatabase, remove } from "../slices/databases";
import devices from "../utils/devices";

const { Sider } = Layout;

const SideBarWrapper = styled.div`
  width: 200px;
  height: 100%;
  padding: 25px 20px;
  background-color: rgb(247, 246, 243);

  .title {
    display: flex;
    align-items: center;
    font-size: 1.25em;
    .add-btn {
      margin-left: auto;
      font-size: 13px;
      color: gray;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: black;
      }
    }
  }
`;

const DatabaseList = styled.div`
  .item {
    display: flex;
    align-items: center;
    padding: 4px 2px;
    border-radius: 1px;
    word-break: break-all;
    cursor: pointer;
    user-select: none;

    .delete-btn {
      margin-left: auto;
      cursor: pointer;
      visibility: hidden;
    }

    &:hover,
    &:focus,
    &.active {
      background-color: rgb(233, 232, 229);
      outline: none;

      .delete-btn {
        visibility: visible;
      }
    }
  }
`;

export function Sidebar({
  databases,
  currentDatabaseId,
  onChange,
  onDatabaseCreate,
  onDatabaseDelete,
}) {
  const isActive = (databaseId) => currentDatabaseId === databaseId;

  const handleDeleteBtnClick = (event, databaseId) => {
    event.stopPropagation();

    if (isActive(databaseId)) {
      onChange(null);
    }
    setTimeout(() => {
      onDatabaseDelete(databaseId);
    });
  };

  const [collapsed, setCollapsed] = useState(false);

  const collapseSider = () => {
    const isLg = window.matchMedia(devices.lg).matches;
    if (isLg) {
      return;
    }

    setCollapsed(true);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0" collapsed={collapsed} onCollapse={setCollapsed}>
      <SideBarWrapper>
        <h2 className="title">
          Databases
          <AppstoreAddOutlined
            data-testid="add-btn"
            className="add-btn"
            onClick={() => onDatabaseCreate("Untitled")}
          />
        </h2>

        <DatabaseList>
          {Object.keys(databases).map((databaseId) => {
            const handleItemSelect = () => {
              onChange(databaseId);
              collapseSider();
            };

            return (
              <div
                data-testid={`${databaseId}-database-item`}
                role="button"
                onClick={handleItemSelect}
                onKeyPress={handleItemSelect}
                tabIndex={0}
                key={databaseId}
                className={`item ${isActive(databaseId) ? "active" : ""}`}
              >
                {databases[databaseId].name}
                <DeleteOutlined
                  data-testid={`${databaseId}-delete-btn`}
                  onClick={(event) => handleDeleteBtnClick(event, databaseId)}
                  className="delete-btn"
                />
              </div>
            );
          })}
        </DatabaseList>
      </SideBarWrapper>
    </Sider>
  );
}

Sidebar.defaultProps = {
  currentDatabaseId: null,
};

Sidebar.propTypes = {
  databases: PropTypes.objectOf(PropTypes.object).isRequired,
  onDatabaseCreate: PropTypes.func.isRequired,
  onDatabaseDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  currentDatabaseId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  databases: state.databases,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDatabaseCreate: (name) => dispatch(createDatabase({ name })),
    onDatabaseDelete: (databaseId) => dispatch(remove({ databaseId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
