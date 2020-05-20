import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Layout } from "antd";
import { AppstoreAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { createDatabase, remove } from "../slices/databases";

const { Sider } = Layout;

const SideBarWrapper = styled(Sider)`
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

function SideBar({ databases, onDatabaseCreate, currentDatabaseId, onChange, onDatabaseDelete }) {
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

  return (
    <SideBarWrapper>
      <h2 className="title">
        Databases
        <AppstoreAddOutlined className="add-btn" onClick={() => onDatabaseCreate("Untitled")} />
      </h2>

      <DatabaseList>
        {Object.keys(databases).map((databaseId) => {
          const handleItemSelect = () => onChange(databaseId);

          return (
            <div
              role="button"
              onClick={handleItemSelect}
              onKeyPress={handleItemSelect}
              tabIndex={0}
              key={databaseId}
              className={`item ${isActive(databaseId) ? "active" : ""}`}
            >
              {databases[databaseId].name}
              <DeleteOutlined
                onClick={(event) => handleDeleteBtnClick(event, databaseId)}
                className="delete-btn"
              />
            </div>
          );
        })}
      </DatabaseList>
    </SideBarWrapper>
  );
}

SideBar.defaultProps = {
  currentDatabaseId: null,
};

SideBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
