import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { Layout } from "antd";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Database from "./components/Database/Database";

const { Content } = Layout;

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const AppContent = styled(Content)`
  background-color: white;
`;

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Sidebar />
        <AppContent>
          <Database databaseId="tutu" />
        </AppContent>
      </AppLayout>
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;