import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Sidebar } from "../../components/Sidebar";

const createDatabases = () => ({
  123: {
    id: "123",
    name: "tutu",
  },
  456: {
    id: "456",
    name: "kanahei",
  },
  789: {
    id: "789",
    name: "piske",
  },
});

it("should render self", async () => {
  const databases = createDatabases();
  const currentDatabaseId = "123";

  const { getAllByTestId } = render(
    <Sidebar
      databases={databases}
      onDatabaseCreate={() => {}}
      onDatabaseDelete={() => {}}
      onChange={() => {}}
      currentDatabaseId={currentDatabaseId}
    />
  );
  const databaseItems = getAllByTestId(/database-item/);

  expect(databaseItems.length).toBe(3);
  expect(databaseItems[0]).toHaveClass("active");
});

it("should call onDatabaseCreate", async () => {
  const databases = createDatabases();
  const handleDatabaseCreate = jest.fn();

  const { getByTestId } = render(
    <Sidebar
      databases={databases}
      onDatabaseCreate={handleDatabaseCreate}
      onDatabaseDelete={() => {}}
      onChange={() => {}}
      currentDatabaseId={null}
    />
  );
  const addBtn = getByTestId("add-btn");

  fireEvent.click(addBtn);

  expect(handleDatabaseCreate.mock.calls.length).toBe(1);
});

it("should call onDatabaseDelete", async () => {
  const databases = createDatabases();
  const handleDatabaseDelete = jest.fn();

  const { getByTestId } = render(
    <Sidebar
      databases={databases}
      onDatabaseCreate={() => {}}
      onDatabaseDelete={handleDatabaseDelete}
      onChange={() => {}}
      currentDatabaseId={null}
    />
  );
  const deleteBtn = getByTestId("789-delete-btn");

  fireEvent.click(deleteBtn);

  await new Promise((resolve) => setTimeout(resolve));
  expect(handleDatabaseDelete.mock.calls.length).toBe(1);
  expect(handleDatabaseDelete.mock.calls[0][0]).toBe("789");
});

it("should call onChange", async () => {
  const databases = createDatabases();
  const handleChange = jest.fn();

  const { getByTestId } = render(
    <Sidebar
      databases={databases}
      onDatabaseCreate={() => {}}
      onDatabaseDelete={() => {}}
      onChange={handleChange}
      currentDatabaseId={null}
    />
  );
  const targetItem = getByTestId("456-database-item");

  fireEvent.click(targetItem);

  expect(handleChange.mock.calls.length).toBe(1);
  expect(handleChange.mock.calls[0][0]).toBe("456");
});
