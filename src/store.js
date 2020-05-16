import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

if (module.hot) {
  module.hot.accept("./reducers", () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require("./reducers").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
