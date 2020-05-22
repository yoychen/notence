/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { getDefaultAdditional } from "../components/MetaInputs";
import { deleteFilter } from "./views";

const initialState = {};

const slice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    create: (state, { payload: { id, name, type = "Text", additional = {} } }) => {
      state[id] = {
        id,
        name,
        type,
        additional,
      };
    },
    updateAdditional: (state, { payload: { propertyId, additionalChange } }) => {
      state[propertyId].additional = {
        ...state[propertyId].additional,
        ...additionalChange,
      };
    },
    remove: (state, { payload: { propertyId } }) => {
      delete state[propertyId];
    },
  },
});

export const { create, updateAdditional, remove } = slice.actions;

export default slice.reducer;

export const createProperty = ({ name, type, id }) => (dispatch) => {
  const additional = getDefaultAdditional(type);

  const property = {
    name,
    type,
    id: id || shortid.generate(),
    additional,
  };

  dispatch(create(property));
};

export const removeProperty = (propertyId) => (dispatch, getState) => {
  const { views } = getState();

  Object.keys(views).forEach((viewId) => {
    views[viewId].filters.forEach((filter) => {
      if (filter.propertyId === propertyId) {
        dispatch(deleteFilter({ viewId, filterId: filter.id }));
      }
    });
  });

  dispatch(remove({ propertyId }));
};
