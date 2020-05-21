import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

if (module.hot) {
  module.hot.accept("./reducers", () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require("./reducers").default;
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
  });
}
