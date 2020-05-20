/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { createView } from "./views";
import { createPage } from "./pages";
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
  },
});

export const { create, addPage, addProperty, remove, rename } = slice.actions;

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

export const createPropertyInDatabase = (databaseId, { name, type }) => (dispatch) => {
  const property = {
    name,
    type,
    id: shortid.generate(),
  };
  dispatch(createProperty(property));

  dispatch(addProperty({ databaseId, propertyId: property.id }));
};
