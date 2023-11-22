import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { cmpTodo, delTodo, ITodoState } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  min-width: 480px;
  margin-left: 10px;
`;
const Content = styled.div<{ cmp: boolean }>`
  opacity: ${(props) => props.cmp && "0.5"};
  & > div:first-child {
    & > div:nth-child(2) {
      h1 {
        text-decoration: ${(props) => props.cmp && "line-through"};
      }
    }
  }
`;
const ShowCt = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 8% 77% 15%;
  align-items: center;
  margin: 10px 0;

  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  }
  & > * {
    width: 100%;
  }
`;

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;

const SetGrp = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SetBtn = styled.div`
  margin-left: 20px;
  &:last-child {
    margin: 0 20px;
  }
`;
const SubCt = styled.div``;

interface IToDoProps {
  recursiveData: ITodoState[];
}
export default function Todo({ recursiveData }: IToDoProps) {
  const dispatch = useAppDispatch();
  const { todoSetTg, addTg, fixTg, currentTodo } = useAppSelector(
    (state) => state.uiState
  );

  const onBtnClick = (
    type: string,
    todo: ITodoState,
    e: React.FormEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    console.log("btn");
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
        <Content
          key={todo.id}
          onClick={() => {
            dispatch(cmpTodo(todo.id));
          }}
          cmp={todo.completed}
        >
          <ShowCt>
            {todo.completed ? (
              <Check
                onClick={() => {
                  dispatch(cmpTodo(todo.id));
                }}
              >
                <i className="fa-solid fa-check" />
              </Check>
            ) : (
              <div />
            )}

            <Title>
              {fixTg && currentTodo.id === todo.id ? (
                <TodoTypeInput type="FIX" />
              ) : (
                <h1>{todo.text}</h1>
              )}
            </Title>
            <SetGrp>
              {!todoSetTg ? (
                <SetBtn
                  onClick={(e: React.FormEvent<HTMLElement>) =>
                    onBtnClick("ADD", todo, e)
                  }
                >
                  <i className="fa-solid fa-plus" />
                </SetBtn>
              ) : (
                <>
                  <SetBtn
                    onClick={(e: React.FormEvent<HTMLElement>) =>
                      onBtnClick("FIX", todo, e)
                    }
                  >
                    <i className="fa-solid fa-pen" />
                  </SetBtn>
                  <SetBtn
                    onClick={(e: React.FormEvent<HTMLElement>) =>
                      onBtnClick("DEL", todo, e)
                    }
                  >
                    <i className="fa-solid fa-xmark" />
                  </SetBtn>
                </>
              )}
            </SetGrp>
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
