import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import Todo from "./Todo";
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

export default function Todos() {
  const toDoRedux = useAppSelector((state) => state.todos);
  // console.log(toDoRedux);

  return (
    <Container>
      <ToDoList>
        <Todo recursiveData={toDoRedux} />
      </ToDoList>
    </Container>
  );
}
