/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const initialState = {};

const slice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    create: (state, { payload: { id, name, type = "Text" } }) => {
      state[id] = {
        id,
        name,
        type,
      };
    },
  },
});

export const { create } = slice.actions;

export default slice.reducer;

export const createProperty = ({ name, type, id }) => (dispatch) => {
  const property = {
    name,
    type,
    id: id || shortid.generate(),
  };

  dispatch(create(property));
};
