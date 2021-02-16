import {
  configureStore,
  createStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "../root_reducers";

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({reducer, middleware, devTools: true});
