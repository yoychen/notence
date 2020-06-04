import shortid from "shortid";
import * as databasesActions from "../../../slices/databases";
import * as viewsActions from "../../../slices/views";
import * as pagesActions from "../../../slices/pages";
import * as propertiesActions from "../../../slices/properties";
import createMockStore from "../utils/createMockStore";
import createAction from "../utils/createAction";
import { getDefaultAdditional } from "../../../components/MetaInputs";

jest.mock("../../../components/MetaInputs");
const stubGetDefaultAdditional = (defaultAdditional) =>
  getDefaultAdditional.mockReturnValue(defaultAdditional);

jest.mock("shortid");
const stubShortid = (value) => shortid.generate.mockReturnValue(value);

test("createDatabase", () => {
  const id = "123";
  stubShortid(id);

  const database = {
    name: "test",
  };

  const expectedActions = [
    createAction(viewsActions.create.type, {
      id,
      name: "default",
    }),
    createAction(databasesActions.create.type, {
      id,
      name: database.name,
      views: [id],
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.createDatabase(database));

  expect(store.getActions()).toEqual(expectedActions);
});

test("createPageInDatabase", () => {
  const databaseId = "123";
  const page = { title: "tutu", meta: {} };

  const pageId = "678";
  stubShortid(pageId);

  const expectedActions = [
    createAction(pagesActions.create.type, {
      ...page,
      id: pageId,
    }),
    createAction(databasesActions.addPage.type, {
      databaseId,
      pageId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.createPageInDatabase(databaseId, page));

  expect(store.getActions()).toEqual(expectedActions);
});

test("deletePageInDatabase", () => {
  const databaseId = "123";
  const pageId = "456";

  const expectedActions = [
    createAction(pagesActions.remove.type, {
      pageId,
    }),
    createAction(databasesActions.popPage.type, {
      databaseId,
      pageId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.deletePageInDatabase(databaseId, pageId));

  expect(store.getActions()).toEqual(expectedActions);
});

test("createViewInDatabase", () => {
  const databaseId = "123";
  const view = { name: "tutu", type: "List" };

  const viewId = "678";
  stubShortid(viewId);

  const expectedActions = [
    createAction(viewsActions.create.type, {
      ...view,
      id: viewId,
    }),
    createAction(databasesActions.addView.type, {
      databaseId,
      viewId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.createViewInDatabase(databaseId, view));

  expect(store.getActions()).toEqual(expectedActions);
});

test("deleteViewInDatabase", () => {
  const databaseId = "123";
  const viewId = "678";

  const expectedActions = [
    createAction(viewsActions.remove.type, {
      viewId,
    }),
    createAction(databasesActions.popView.type, {
      databaseId,
      viewId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.deleteViewInDatabase(databaseId, viewId));

  expect(store.getActions()).toEqual(expectedActions);
});

test("createPropertyInDatabase", () => {
  const databaseId = "123";
  const property = { name: "tutu", type: "Select" };

  const defaultAdditional = {};
  stubGetDefaultAdditional(defaultAdditional);

  const propertyId = "678";
  stubShortid(propertyId);

  const expectedActions = [
    createAction(propertiesActions.create.type, {
      ...property,
      id: propertyId,
      additional: defaultAdditional,
    }),
    createAction(databasesActions.addProperty.type, {
      databaseId,
      propertyId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.createPropertyInDatabase(databaseId, property));

  expect(store.getActions()).toEqual(expectedActions);
});

test("deletePropertyInDatabase", () => {
  const databaseId = "123";
  const propertyId = "678";

  const expectedActions = [
    createAction(propertiesActions.remove.type, {
      propertyId,
    }),
    createAction(databasesActions.popProperty.type, {
      databaseId,
      propertyId,
    }),
  ];

  const store = createMockStore();
  store.dispatch(databasesActions.deletePropertyInDatabase(databaseId, propertyId));

  expect(store.getActions()).toEqual(expectedActions);
});

test("dispatch deletePropertyInDatabase when the property appears in some filter rules", () => {
  const databaseId = "123";
  const propertyId = "678";
  const viewId = "346";
  const filterId = "876";

  const views = {
    [viewId]: {
      id: viewId,
      filters: [
        {
          id: filterId,
          propertyId,
          args: [],
        },
      ],
    },
  };

  const expectedAction = createAction(viewsActions.deleteFilter.type, {
    viewId,
    filterId,
  });

  const store = createMockStore({ views });
  store.dispatch(databasesActions.deletePropertyInDatabase(databaseId, propertyId));

  expect(store.getActions()[0]).toEqual(expectedAction);
});
