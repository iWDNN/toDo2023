import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { cmpTodo, delTodo, ITodoState } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import TodoTypeInput from "./TodoTypeInput";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 15px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ShowCt = styled.div`
  height: 30px;
  position: relative;
  display: grid;
  grid-template-columns: 10% 80% 10% 0%; //
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid ${(props) => props.theme.accentColor};
`;
const Check = styled.div<{ isCmp: boolean }>`
  i {
    color: ${(props) => (props.isCmp ? "#4cd137" : "#e1e1e1")};
  }
`;
const Title = styled.div`
  word-break: break-all;
  white-space: pre-line;
`;
const SetMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SetBtn = styled.div<{ isTg?: boolean }>`
  i {
    padding: 5px;
    font-size: 18px;
    font-weight: 700;
    /* transition: all 0.2s ease-in-out; */
    transform: ${(props) => props.isTg && "rotate(45deg)"};
  }
`;
const SubCt = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: center;
`;

interface IToDoProps {
  recursiveData: ITodoState[];
}
export default function Todo({ recursiveData }: IToDoProps) {
  const dispatch = useAppDispatch();
  const { todoSetTg, addTg, fixTg, currentTodo } = useAppSelector(
    (state) => state.uiState
  );

  const onBtnClick = (type: string, todo: ITodoState) => {
    switch (type) {
      case "ADD":
        dispatch(setUi({ type, id: todo.id }));
        break;
      case "FIX":
        dispatch(setUi({ type, id: todo.id }));
        break;
      case "DEL":
        dispatch(delTodo(todo.id));
    }
    dispatch(setCurTodo(todo));
  };

  return (
    <Container>
      {recursiveData.map((todo) => (
        <Content key={todo.id}>
          <ShowCt>
            <Check
              isCmp={todo.completed}
              onClick={() => {
                dispatch(cmpTodo(todo.id));
              }}
            >
              <i className="fa-solid fa-check" />
            </Check>
            <Title>
              {fixTg && currentTodo.id === todo.id ? (
                <TodoTypeInput type="FIX" />
              ) : (
                <h1>{todo.text}</h1>
              )}
            </Title>
            <SetMenu>
              {todoSetTg && (
                <>
                  <SetBtn onClick={() => onBtnClick("ADD", todo)}>
                    <i className="fa-solid fa-plus" />
                  </SetBtn>
                  <SetBtn onClick={() => onBtnClick("FIX", todo)}>
                    <i className="fa-solid fa-pen" />
                  </SetBtn>
                  <SetBtn onClick={() => onBtnClick("DEL", todo)}>
                    <i className="fa-solid fa-xmark" />
                  </SetBtn>
                </>
              )}
            </SetMenu>
          </ShowCt>
          {addTg && currentTodo.id === todo.id && (
            <SubCt>
              <TodoTypeInput type="ADD" />
            </SubCt>
          )}
          {todo.comment && <Todo recursiveData={todo.comment} />}
        </Content>
      ))}
    </Container>
  );
}
