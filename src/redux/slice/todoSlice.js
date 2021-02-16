import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    create: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: ({ desc }) => ({
        payload: {
          id: uuid(),
          desc: desc,
          isCompleted: false,
        },
      }),
    },

    edit: (state, action) => {
      const myTodo = state.find((todo) => todo.id === action.payload.id);
      if (myTodo) {
        myTodo.desc = action.payload.desc;
      }
    },

    toggle: (state, action) => {
      const myTodo = state.find((todo) => todo.id === action.payload.id);
      if (myTodo) {
        myTodo.isCompleted = action.payload.isCompleted;
      }
    },

    remove: (state, action) => {
      const myTodoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (myTodoIndex !== -1) {
        state.splice(myTodoIndex, 1);
      }
    },
  },
});

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null,
  reducers: {
    select: (state, action) => action.payload,
  },
});

export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: removeTodoActionCreator,
} = todoSlice.actions;

export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

export default {
  todo: todoSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
};
