import React, { useState } from "react";
import styled from "styled-components";
import {
  createTodoActionCreator,
  editTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
  selectTodoActionCreator,
} from "../redux/slice/todoSlice";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

const MainContainer = styled.div``;

const HeadContainer = styled.div`
  width: 100vw;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    79deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 32, 161, 1) 34%,
    rgba(0, 212, 255, 1) 100%
  );
`;
const MainText = styled.p`
  font-size: 64px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  text-shadow: 4px 2px 10px rgba(0, 0, 15, 0.78);
`;
const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
const CreateTodoField = styled.input`
  outline: none;
  height: 32px;
  width: 300px;
  border-radius: 6px;
  margin-right: 16px;
  padding: 2px 10px;
  border: 1px solid rgba(2, 0, 36, 1);
  font-weight: 600;
`;
const CreateTodoBtn = styled.button`
  box-shadow: inset 1px 0px 50px -50px #97c4fe;
  background: linear-gradient(to bottom, #3d94f6 5%, #022e70 100%);
  background-color: #3d94f6;
  border-radius: 6px;
  border: 1px solid #337fed;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 50px 17px 37px #1570cd;
  outline: none;
  height: 36px;
  width: 90px;
  color: white;
`;

const TodoBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100vw;
`;

const TodoBodyContianer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-around;
`;

const TodoList = styled.div`
  margin-right: 20px;
  width: 50%;
`;
const TodoSelected = styled.div`
  margin-left: 20px;
  width: 50%;
`;

const TodoTitle = styled.p`
  font-weight: 600;
  font-size: 28px;
`;
const TodoUl = styled.ol`
  padding: 0 0 0 20px;
`;
const TodoLi = styled.li`
  padding: 0;
  margin-bottom: 10px;
  font-weight: 500;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  cursor: pointer;
`;

const SelectedTodo = styled.div``;
const SelectedTodoText = styled.p`
  font-weight: 500;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  margin: 0 0 10px 0;
`;
const SelectedTodoBtnContainer = styled.div`
  display: flex;
`;
const SelectedTodoBtns = styled.button`
  margin-right: 16px;
  color: white;
  outline: none;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#e4685d")};
  box-shadow: ${({ boxShadow }) =>
    boxShadow ? boxShadow : "inset 0px 39px 0px -24px #e67a73"};
  border-radius: 5px;
  border: ${({ border }) => (border ? border : "1px solid #ffffff")};
  display: inline-block;
  cursor: pointer;
  font-size: 12px;
  padding: 6px 15px;
  text-decoration: none;
  text-shadow: ${({ textShadow }) =>
    textShadow ? textShadow : "0px 1px 0px #b23e35"};
`;

const TodoEditInput = styled.input`
  outline: none;
  height: 32px;
  width: 300px;
  margin-bottom: 1em;
  border: none;
  border-bottom: 1px solid gray;
  font-weight: 600;
  margin-top: -5px;
`;

const NoSelected = styled.p`
  color: gray;
  font-style: italic;
  font-size: 16px;
`;

const todo1 = [
  {
    id: 1,
    desc: " Hellow as d  as d  sa d a s d as d  as d as d  as d a sd ",
    completed: false,
  },
  {
    id: 2,
    desc: " Hellow",
    completed: false,
  },
  {
    id: 3,
    desc: " Hellow",
    completed: true,
  },
  {
    id: 4,
    desc: " Hellow",
    completed: false,
  },
];

const SelectedBtns = [
  {
    text: "Edit",
    bgColor: "#77b55a",
    border: "1px solid #4b8f29",
    textShadow: "0px 1px 0px #b23e35",
    boxShadow: "0px 1px 0px #5b8a3c",
  },
  {
    text: "Toggle",
    bgColor: "#7892c2",
    border: "1px solid #4e6096",
    textShadow: "0px 1px 0px #283966",
    boxShadow: "0px 0px 0px 2px #9fb4f2",
  },
  {
    text: "Delete",
    bgColor: "#e4685d",
    border: "1px solid #ffffff",
    textShadow: "0px 1px 0px #b23e35",
    boxShadow: "inset 0px 39px 0px -24px #e67a73",
  },
];

const EditBtns = [
  {
    text: "Ok",
    bgColor: "#77b55a",
    border: "1px solid #4b8f29",
    textShadow: "0px 1px 0px #b23e35",
    boxShadow: "0px 1px 0px #5b8a3c",
  },
  {
    text: "Cancel",
    bgColor: "#e4685d",
    border: "1px solid #ffffff",
    textShadow: "0px 1px 0px #b23e35",
    boxShadow: "inset 0px 39px 0px -24px #e67a73",
  },
];

export default function Home() {
  const [newTodo, setNewTodo] = useState(null);
  const [selected, SetSelected] = useState(null);
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();

  const { selectedTodo, todo } = useSelector((state) => state);

  const actions = bindActionCreators(
    {
      create: createTodoActionCreator,
      edit: editTodoActionCreator,
      toggle: toggleTodoActionCreator,
      remove: removeTodoActionCreator,
      select: selectTodoActionCreator,
    },
    dispatch
  );

  const btnClickHandler = (btnName, val) => {
    switch (btnName) {
      case "Edit":
        setEdit(selectedTodo?.desc);
        break;
      case "Toggle":
        actions.toggle({
          id: selectedTodo?.id,
          isCompleted: !selectedTodo?.isCompleted,
        });
        actions.select({
          ...selectedTodo,
          isCompleted: !selectedTodo?.isCompleted,
        });
        break;
      case "Delete":
        actions.remove({
          id: selectedTodo?.id,
        });
        actions.select(null);
        break;
      case "Ok":
        actions.edit({ id: selectedTodo?.id, desc: edit });
        actions.select({
          ...selectedTodo,
          desc: edit,
        });
        setEdit(null);
        break;
      case "Cancel":
        setEdit(null);
        break;

      default:
        break;
    }
  };

  const onEditChange = (e) => {
    const { value } = e.target;
    setEdit(value);
  };

  const createTodoHandler = () => {
    console.log("mt new rodo", newTodo);
    if (!newTodo && newTodo === "") return;
    actions.create({ desc: newTodo });
    setNewTodo("");
  };

  const createTodoChange = (e) => {
    const { value } = e.target;
    setNewTodo(value);
  };

  console.log("my todos", selectedTodo);

  return (
    <MainContainer>
      <HeadContainer>
        <MainText>Redux Toolkit Test</MainText>
        <TodoContainer>
          <CreateTodoField value={newTodo} onChange={createTodoChange} />
          <CreateTodoBtn onClick={createTodoHandler}>Create</CreateTodoBtn>
        </TodoContainer>
      </HeadContainer>
      <TodoBody>
        <TodoBodyContianer>
          <TodoList>
            <TodoTitle>My Todo List</TodoTitle>
            <TodoUl>
              {todo?.length > 0 ? (
                <>
                  {todo?.map((val) => (
                    <TodoLi
                      completed={val.isCompleted}
                      onClick={() => {
                        actions.select(val);
                        setEdit(null);
                      }}
                    >
                      {val.desc}
                    </TodoLi>
                  ))}
                </>
              ) : (
                <NoSelected>No Todo's created</NoSelected>
              )}
            </TodoUl>
          </TodoList>
          <TodoSelected>
            <TodoTitle>My Selected Todo</TodoTitle>
            <SelectedTodo>
              {selectedTodo ? (
                <>
                  {!edit ? (
                    <>
                      <SelectedTodoText completed={selectedTodo?.isCompleted}>
                        {selectedTodo?.desc}
                      </SelectedTodoText>
                      <SelectedTodoBtnContainer>
                        {SelectedBtns.map((val) => (
                          <SelectedTodoBtns
                            {...val}
                            onClick={() => btnClickHandler(val.text)}
                          >
                            {val.text}
                          </SelectedTodoBtns>
                        ))}
                      </SelectedTodoBtnContainer>
                    </>
                  ) : (
                    <>
                      <TodoEditInput value={edit} onChange={onEditChange} />
                      <SelectedTodoBtnContainer>
                        {EditBtns.map((val) => (
                          <SelectedTodoBtns
                            {...val}
                            onClick={() => btnClickHandler(val.text)}
                          >
                            {val.text}
                          </SelectedTodoBtns>
                        ))}
                      </SelectedTodoBtnContainer>
                    </>
                  )}
                </>
              ) : (
                <NoSelected>Nothing been selected </NoSelected>
              )}
            </SelectedTodo>
          </TodoSelected>
        </TodoBodyContianer>
      </TodoBody>
    </MainContainer>
  );
}
