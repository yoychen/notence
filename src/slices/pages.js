/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { getDefaultValue } from "../components/MetaInputs";

const initialState = {};

const slice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    create: (state, { payload: { id, title, meta = {}, content = "" } }) => {
      state[id] = {
        id,
        title,
        meta,
        content,
      };
    },
    updateMeta: (state, { payload: { pageId, propertyId, value } }) => {
      state[pageId].meta[propertyId] = value;
    },
    updateContent: (state, { payload: { pageId, content } }) => {
      state[pageId].content = content;
    },
    updateTitle: (state, { payload: { pageId, title } }) => {
      state[pageId].title = title;
    },
    remove(state, { payload: { pageId } }) {
      delete state[pageId];
    },
  },
});

export const { create, updateMeta, updateContent, updateTitle, remove } = slice.actions;

export default slice.reducer;

export const createPage = ({ title, id }) => (dispatch) => {
  const page = {
    title,
    id: id || shortid.generate(),
  };

  dispatch(create(page));
};

export const getMetaValue = (meta, property) =>
  meta[property.id] !== undefined ? meta[property.id] : getDefaultValue(property.type);
