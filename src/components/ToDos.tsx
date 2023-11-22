import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetToDos } from "../redux/todo/todoSlice";
import { setUi } from "../redux/uiState/uiStateSlice";
import Todo from "./Todo";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;
const SetGrp = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0 0;
`;
const SetIcon = styled.div`
  font-size: 1.1em;
  margin-left: 10px;
`;
const ToDoList = styled.div`
  padding: 10px;
`;

export default function Todos() {
  const dispatch = useAppDispatch();
  const toDoRedux = useAppSelector((state) => state.todos);

  return (
    <Container>
      <SetGrp>
        <SetIcon
          onClick={() => {
            dispatch(setUi({ type: "SET" }));
          }}
        >
          <i className="fa-solid fa-gear" />
        </SetIcon>
        <SetIcon
          onClick={() => {
            dispatch(resetToDos());
          }}
        >
          <i className="fa-solid fa-trash" />
        </SetIcon>
      </SetGrp>
      <ToDoList>
        <Todo recursiveData={toDoRedux} />
      </ToDoList>
    </Container>
  );
}
