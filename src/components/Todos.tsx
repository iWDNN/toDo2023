import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { ITodoState } from "../redux/todo/todoSlice";
import Todo from "./Todo";

const Container = styled.div`
  min-width: 480px;
  margin-left: 20px;
`;
interface IToDoProps {
  recursiveData: ITodoState[];
  repeat?: boolean;
}

export default function Todos({ recursiveData, repeat = true }: IToDoProps) {
  return (
    <Container>
      {recursiveData.map((todo) => (
        <Todo key={uuid()} todoData={todo} />
      ))}
    </Container>
  );
}
