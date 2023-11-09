import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { setFixBtn } from "../redux/uiState/uiStateSlice";
import Progress from "./Progress";
import ToDo from "./ToDo";
const Container = styled.div`
  max-width: 480px;
  padding: 0 10px;
  margin: 0 auto;
`;
const ToDoList = styled.div`
  margin: 0 auto;
`;
const SetIcon = styled.div<{ isActive: boolean }>`
  position: absolute;
  font-size: 24px;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 7px;
  color: ${(props) => props.isActive && "#fff"};
  background-color: ${(props) => props.isActive && "#000"};
`;

export default function ToDos() {
  const dispatch = useDispatch();
  const setTg = useAppSelector((state) => state.uiState.todoSetBtn);
  const toDos = useAppSelector((state) => state.toDos);

  return (
    <Container>
      <ToDoList>
        <SetIcon
          isActive={setTg}
          onClick={() => {
            dispatch(setFixBtn());
          }}
        >
          <i className="fa-solid fa-gear" />
        </SetIcon>
        {toDos.map((todo) => (
          <ToDo key={todo.id} data={todo} />
        ))}
      </ToDoList>
      <Progress />
    </Container>
  );
}
