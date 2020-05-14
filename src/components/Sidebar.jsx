import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const SideBar = styled(Sider)`
  padding: 25px 20px;
  background-color: rgb(247, 246, 243);

  .title {
    font-size: 1.25em;
    .add-btn {
      float: right;
      line-height: 30px;
      font-size: 13px;
      color: gray;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }
`;

const DatabaseList = styled.ul`
  padding: 0;

  li {
    padding: 4px 2px;
    border-radius: 1px;
    list-style: none;
    cursor: pointer;

    &:hover {
      background-color: rgb(233, 232, 229);
    }
  }
`;

export default function () {
  return (
    <SideBar>
      <h2 className="title">
        Databases
        <AppstoreAddOutlined className="add-btn" />
      </h2>

      <DatabaseList>
        <li>fsdfdsfsf</li>
        <li>fsdfdsfsf</li>
        <li>fsdfdsfsf</li>
        <li>fsdfdsfsf</li>
      </DatabaseList>
    </SideBar>
  );
}
