/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { createView, remove as removeView, updateGroupBy } from "./views";
import { createPage, remove as removePage } from "./pages";
import { createProperty, removeProperty } from "./properties";

const initialState = {};

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
    popProperty: (state, { payload: { databaseId, propertyId } }) => {
      const { properties } = state[databaseId];
      const index = properties.indexOf(propertyId);
      properties.splice(index, 1);
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
  popProperty,
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

export const createPageInDatabase = (databaseId, { title, meta }) => (dispatch) => {
  const page = {
    title,
    meta,
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

export const createPropertyInDatabase = (databaseId, { name, type, id }) => (dispatch) => {
  const property = {
    name,
    type,
    id: id || shortid.generate(),
  };
  dispatch(createProperty(property));

  dispatch(addProperty({ databaseId, propertyId: property.id }));
};

export const deletePropertyInDatabase = (databaseId, propertyId) => (dispatch) => {
  dispatch(removeProperty(propertyId));
  dispatch(popProperty({ databaseId, propertyId }));
};

export const initGroupBy = (databaseId, viewId) => (dispatch) => {
  const property = {
    name: "Status",
    type: "Select",
    id: shortid.generate(),
  };
  dispatch(createPropertyInDatabase(databaseId, property));

  dispatch(updateGroupBy({ viewId, propertyId: property.id }));
};
