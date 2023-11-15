import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { setFixBtn } from "../redux/uiState/uiStateSlice";
import ToDo from "./ToDo";
const Container = styled.div`
  max-width: 1080px;
  padding: 0 10px;
  margin: 0 auto;
`;
const ToDoList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Gear = styled.div`
  position: absolute;
  font-size: 24px;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 7px;
`;

export default function ToDos() {
  const dispatch = useDispatch();
  const toDoRedux = useAppSelector((state) => state.toDos);

  return (
    <Container>
      <ToDoList>
        <Gear
          onClick={() => {
            dispatch(setFixBtn());
          }}
        >
          <i className="fa-solid fa-gear" />
        </Gear>
        <ToDo recursiveData={toDoRedux} />
      </ToDoList>
    </Container>
  );
}
