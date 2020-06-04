// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export default (overwrite) => {
  const initialState = { databases: {}, views: {}, pages: {}, properties: {}, ...overwrite };
  return mockStore(initialState);
};
