/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { createView, remove as removeView } from "./views";
import { createPage, remove as removePage } from "./pages";
import { createProperty } from "./properties";

const initialState = {
  tutu: {
    id: "tutu",
    name: "haha",
    pages: [],
    views: ["tttt"],
    properties: [],
  },
};

const slice = createSlice({
  name: "databases",
  initialState,
  reducers: {
    create: (state, { payload: { id, name, pages = [], views = [], properties = [] } }) => {
      state[id] = {
        id,
        name,
        pages,
        views,
        properties,
      };
    },
    addPage: (state, { payload: { databaseId, pageId } }) => {
      state[databaseId].pages.push(pageId);
    },
    addProperty: (state, { payload: { databaseId, propertyId } }) => {
      state[databaseId].properties.push(propertyId);
    },
    remove: (state, { payload: { databaseId } }) => {
      delete state[databaseId];
    },
    rename: (state, { payload: { databaseId, newName } }) => {
      state[databaseId].name = newName;
    },
    addView: (state, { payload: { databaseId, viewId } }) => {
      state[databaseId].views.push(viewId);
    },
    popView: (state, { payload: { databaseId, viewId } }) => {
      const { views } = state[databaseId];
      const index = views.indexOf(viewId);
      views.splice(index, 1);
    },
    popPage: (state, { payload: { databaseId, pageId } }) => {
      const { pages } = state[databaseId];
      const index = pages.indexOf(pageId);
      pages.splice(index, 1);
    },
  },
});

export const {
  create,
  addPage,
  addProperty,
  remove,
  rename,
  addView,
  popView,
  popPage,
} = slice.actions;

export default slice.reducer;

export const createDatabase = ({ name }) => (dispatch) => {
  const defaultView = {
    name: "default",
    id: shortid.generate(),
  };
  dispatch(createView(defaultView));

  const database = {
    name,
    id: shortid.generate(),
    views: [defaultView.id],
  };
  dispatch(create(database));
};

export const createPageInDatabase = (databaseId, { title }) => (dispatch) => {
  const page = {
    title,
    id: shortid.generate(),
  };
  dispatch(createPage(page));

  dispatch(addPage({ databaseId, pageId: page.id }));
};

export const deletePageInDatabase = (databaseId, pageId) => (dispatch) => {
  dispatch(removePage({ pageId }));
  dispatch(popPage({ databaseId, pageId }));
};

export const createViewInDatabase = (databaseId, { name, type }) => (dispatch) => {
  const view = {
    name,
    type,
    id: shortid.generate(),
  };
  dispatch(createView(view));

  dispatch(addView({ databaseId, viewId: view.id }));
};

export const deleteViewInDatabase = (databaseId, viewId) => (dispatch) => {
  dispatch(removeView({ viewId }));
  dispatch(popView({ databaseId, viewId }));
};

export const createPropertyInDatabase = (databaseId, { name, type }) => (dispatch) => {
  const property = {
    name,
    type,
    id: shortid.generate(),
  };
  dispatch(createProperty(property));

  dispatch(addProperty({ databaseId, propertyId: property.id }));
};
