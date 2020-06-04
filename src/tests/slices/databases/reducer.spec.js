import reducer, { create, rename, popView, popPage, popProperty } from "../../../slices/databases";
import createAction from "../utils/createAction";

test("create", () => {
  const state = {};
  const database = {
    id: "123",
    name: "tutu",
  };

  const nextState = reducer(
    state,
    createAction(create.type, {
      ...database,
    })
  );

  expect(nextState).toEqual({
    [database.id]: {
      ...database,
      pages: [],
      views: [],
      properties: [],
    },
  });
});

test("rename", () => {
  const databaseId = "321";
  const newName = "kanahei";

  const state = {
    [databaseId]: {
      name: "tutu",
    },
  };

  const nextState = reducer(
    state,
    createAction(rename.type, {
      databaseId,
      newName,
    })
  );

  expect(nextState[databaseId].name).toEqual(newName);
});

test("popView", () => {
  const databaseId = "321";
  const viewId = "456";

  const state = {
    [databaseId]: {
      views: ["123", viewId, "789"],
    },
  };

  const nextState = reducer(
    state,
    createAction(popView.type, {
      databaseId,
      viewId,
    })
  );

  expect(nextState[databaseId].views).toEqual(["123", "789"]);
});

test("popPage", () => {
  const databaseId = "321";
  const pageId = "456";

  const state = {
    [databaseId]: {
      pages: ["123", pageId, "789"],
    },
  };

  const nextState = reducer(
    state,
    createAction(popPage.type, {
      databaseId,
      pageId,
    })
  );

  expect(nextState[databaseId].pages).toEqual(["123", "789"]);
});

test("popProperty", () => {
  const databaseId = "321";
  const propertyId = "456";

  const state = {
    [databaseId]: {
      properties: ["123", propertyId, "789"],
    },
  };

  const nextState = reducer(
    state,
    createAction(popProperty.type, {
      databaseId,
      propertyId,
    })
  );

  expect(nextState[databaseId].properties).toEqual(["123", "789"]);
});
