import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "../actions/auth-actions";
import rootSaga from "../saga/root";

const createSagaMiddleware = require("redux-saga").default;

console.log("🧪 createSagaMiddleware:", typeof createSagaMiddleware);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
