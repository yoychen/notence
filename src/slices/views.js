/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const initialState = {
  tttt: {
    id: "tttt",
    name: "haha",
    type: "ListView",
    filters: [],
    showProperties: [],
    sorts: [],
  },
};

const slice = createSlice({
  name: "views",
  initialState,
  reducers: {
    create: (
      state,
      { payload: { id, name, type = "ListView", filters = [], showProperties = [], sorts = [] } }
    ) => {
      state[id] = {
        id,
        name,
        type,
        filters,
        showProperties,
        sorts,
      };
    },
    toggleShowProperty(state, { payload: { viewId, propertyId } }) {
      const { showProperties } = state[viewId];

      const index = showProperties.indexOf(propertyId);
      if (index > -1) {
        showProperties.splice(index, 1);
      } else {
        showProperties.push(propertyId);
      }
    },
  },
});

export const { create, toggleShowProperty } = slice.actions;

export default slice.reducer;

export const createView = ({ name, id }) => (dispatch) => {
  const view = {
    name,
    id: id || shortid.generate(),
  };

  dispatch(create(view));
};
