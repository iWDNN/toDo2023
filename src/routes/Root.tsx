import React from "react";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import Todos from "../components/Todos";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetToDos, selectNotCmpTodo } from "../redux/todo/todoSlice";
import { setUi } from "../redux/uiState/uiStateSlice";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 10px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;
const TestBtnGrp = styled.div`
  position: absolute;
  display: flex;
`;
const TestBtn = styled.div`
  border: 2px solid black;
  padding: 3px;
`;

function Root() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const notCmpTodo = useAppSelector(selectNotCmpTodo);
  return (
    <Container>
      <TestBtnGrp>
        <TestBtn
          onClick={() => {
            alert(`완료하지 못한 할 일 : ${notCmpTodo.join(" , ")}`);
          }}
        >
          <i className="fa-solid fa-play" />
        </TestBtn>
        <TestBtn
          onClick={() => {
            dispatch(resetToDos());
          }}
        >
          <i className="fa-solid fa-trash" />
        </TestBtn>
        <TestBtn
          onClick={() => {
            dispatch(setUi({ type: "SET" }));
          }}
        >
          <i className="fa-solid fa-gear" />
        </TestBtn>
      </TestBtnGrp>
      <Header>
        <Title>Test Page</Title>
      </Header>
      <TodoInput />
      <Todos />
    </Container>
  );
}

export default Root;
