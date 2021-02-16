import { combineReducers } from "@reduxjs/toolkit";
import todo from "./slice/todoSlice";
import { persistCombineReducers, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  todo: todo.todo,
  selectedTodo: todo.selectedTodo,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist:["selectedTodo"],
  blacklist:[],
};

const myPersistReducer = persistReducer(persistConfig, reducer)

export default myPersistReducer;
