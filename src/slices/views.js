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
    sequence: [],
  },
};

const slice = createSlice({
  name: "views",
  initialState,
  reducers: {
    create: (
      state,
      {
        payload: {
          id,
          name,
          type = "ListView",
          filters = [],
          showProperties = [],
          sorts = [],
          sequence = [],
        },
      }
    ) => {
      state[id] = {
        id,
        name,
        type,
        filters,
        showProperties,
        sorts,
        sequence,
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
    addFilter(state, { payload: { viewId, filter } }) {
      state[viewId].filters.push(filter);
    },
    updateFilter(state, { payload: { viewId, filterId, newFilter } }) {
      const { filters } = state[viewId];
      const index = filters.findIndex((filter) => filter.id === filterId);

      filters[index] = { ...filters[index], ...newFilter };
    },
    deleteFilter(state, { payload: { viewId, filterId } }) {
      const { filters } = state[viewId];
      const index = filters.findIndex((filter) => filter.id === filterId);
      filters.splice(index, 1);
    },
    updateSequence(state, { payload: { viewId, newSequence } }) {
      state[viewId].sequence = newSequence;
    },
    rename(state, { payload: { viewId, newName } }) {
      state[viewId].name = newName;
    },
    remove(state, { payload: { viewId } }) {
      delete state[viewId];
    },
  },
});

export const {
  create,
  toggleShowProperty,
  addFilter,
  updateFilter,
  deleteFilter,
  updateSequence,
  rename,
  remove,
} = slice.actions;

export default slice.reducer;

export const createView = ({ name, id, type }) => (dispatch) => {
  const view = {
    name,
    type,
    id: id || shortid.generate(),
  };

  dispatch(create(view));
};

export const createFilter = (viewId) => (dispatch) => {
  const filter = {
    id: shortid.generate(),
    propertyId: null,
    method: null,
    args: [],
  };

  dispatch(addFilter({ viewId, filter }));
};
