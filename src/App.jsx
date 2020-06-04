import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { Layout, Empty } from "antd";
import "./App.css";
// eslint-disable-next-line import/no-named-as-default
import Sidebar from "./components/Sidebar";
import Database from "./components/Database/Database";

const { Content } = Layout;

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const AppContent = styled(Content)`
  background-color: white;
`;

const EmptyView = styled(Empty)`
  margin-top: 12em;
`;

function App() {
  const [currentDatabaseId, setCurrentDatabaseId] = useState(null);

  return (
    <div className="App">
      <AppLayout>
        <Sidebar currentDatabaseId={currentDatabaseId} onChange={setCurrentDatabaseId} />
        <AppContent>
          {currentDatabaseId ? (
            <Database key={currentDatabaseId} databaseId={currentDatabaseId} />
          ) : (
            <EmptyView description="No Database Selected" />
          )}
        </AppContent>
      </AppLayout>
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
