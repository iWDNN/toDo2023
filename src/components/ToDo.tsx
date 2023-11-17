import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { delTodo, ITodoState } from "../redux/todo/todoSlice";
import {
  ISetUiPayload,
  setCurTodo,
  setUi,
} from "../redux/uiState/uiStateSlice";
import { ADD } from "../type";
import Form from "./Form";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 15px;
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
const IsCmp = styled.div`
  i {
    display: none;
    opacity: 0.1;
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

interface IToDoProps {
  recursiveData: ITodoState[];
}
export default function Todo({ recursiveData }: IToDoProps) {
  const dispatch = useAppDispatch();
  const { todoSetTg, addTg, fixTg, currentTodo } = useAppSelector(
    (state) => state.uiState
  );

  const onBtnClick = (type: string, id: string) => {
    dispatch(setCurTodo(id));
    switch (type) {
      case "ADD":
        dispatch(setUi({ type, id }));
        break;
      case "FIX":
        dispatch(setUi({ type, id }));
        break;
      case "DEL":
        dispatch(delTodo(id));
    }
  };

  return (
    <Container>
      {recursiveData.map((todo) => (
        <Content key={todo.id}>
          <ShowCt>
            <IsCmp>
              <i className="fa-solid fa-check" />
            </IsCmp>
            <Title>
              {fixTg && currentTodo === todo.id ? (
                <Form />
              ) : (
                <h1>{todo.text}</h1>
              )}
            </Title>
            <SetMenu>
              {todoSetTg && (
                <>
                  <SetBtn onClick={() => onBtnClick("ADD", todo.id)}>
                    <i className="fa-solid fa-plus" />
                  </SetBtn>
                  <SetBtn onClick={() => onBtnClick("FIX", todo.id)}>
                    <i className="fa-solid fa-pen" />
                  </SetBtn>
                  <SetBtn onClick={() => onBtnClick("DEL", todo.id)}>
                    <i className="fa-solid fa-xmark" />
                  </SetBtn>
                </>
              )}
            </SetMenu>
          </ShowCt>
          {addTg && currentTodo === todo.id && <Form />}
          {todo.comment && <Todo recursiveData={todo.comment} />}
        </Content>
      ))}
    </Container>
  );
}
