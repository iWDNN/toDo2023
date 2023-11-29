import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  cmpTodo,
  delTodo,
  foldTodo,
  ITodoState,
} from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  min-width: 480px;
  margin-left: 20px;
  user-select: none;
`;
const Content = styled.div``;
const ShowCt = styled.div<{ $cmp: boolean; $setTg: boolean }>`
  height: 40px;
  display: grid;
  grid-template-columns: 85% 15%;
  align-items: center;
  margin: 10px 0;
  border-left: 3px solid ${(props) => (props.$cmp ? "#4cd137" : "none")};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: ${(props) => props.$setTg && "#f2f2f2"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  opacity: ${(props) => props.$cmp && "0.35"};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  }
  & > * {
    width: 100%;
  }
  & > div:nth-child(1) {
    & > div:nth-child(2) {
      h1 {
        text-decoration: ${(props) => props.$cmp && "line-through"};
      }
    }
  }
`;
const FixBox = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 0.8em;
  font-weight: 700;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 0.95em;
  }
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
const AddCt = styled.div``;

interface IToDoProps {
  recursiveData: ITodoState[];
  repeat?: boolean;
}
export default function Todo({ recursiveData, repeat = true }: IToDoProps) {
  const { filterId } = useParams();
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
    switch (type) {
      case "ADD":
        dispatch(setUi({ type, id: todo.id }));
        break;
      case "FIX":
        dispatch(setUi({ type, id: todo.id }));
        break;
      case "DEL":
        if (window.confirm("이 항목을 제거하시겠습니까?"))
          dispatch(delTodo(todo.id));
    }
    dispatch(setCurTodo(todo));
  };

  return (
    <Container>
      {recursiveData.map((todo) => (
        <Content key={todo.id}>
          <ShowCt
            onClick={() => {
              if (!todoSetTg) dispatch(cmpTodo(todo.id));
            }}
            $cmp={todo.completed}
            $setTg={todoSetTg}
          >
            {fixTg && currentTodo.id === todo.id ? (
              <TodoTypeInput type="FIX" />
            ) : (
              <FixBox>
                <Option
                  onClick={() => {
                    dispatch(cmpTodo(todo.id));
                  }}
                >
                  {todo.option !== "NONE" && todo.option}
                </Option>
                <Title>
                  <h1>{todo.text}</h1>
                </Title>
              </FixBox>
            )}
            <SetGrp>
              {!todoSetTg ? (
                !todo.completed &&
                filterId === "all" && (
                  <>
                    {JSON.stringify(todo.comment) !== "[]" && (
                      <SetBtn
                        onClick={(e: React.FormEvent<HTMLElement>) => {
                          e.stopPropagation();
                          dispatch(foldTodo(todo.id));
                        }}
                      >
                        {todo.isFold ? (
                          <i className="fa-solid fa-angle-down" />
                        ) : (
                          <i className="fa-solid fa-angle-up" />
                        )}
                      </SetBtn>
                    )}
                  </>
                )
              ) : (
                <>
                  {!todo.completed && (
                    <>
                      <SetBtn
                        onClick={(e: React.FormEvent<HTMLElement>) =>
                          onBtnClick("ADD", todo, e)
                        }
                      >
                        <i className="fa-solid fa-plus" />
                      </SetBtn>
                      <SetBtn
                        onClick={(e: React.FormEvent<HTMLElement>) =>
                          onBtnClick("FIX", todo, e)
                        }
                      >
                        <i className="fa-solid fa-pen" />
                      </SetBtn>
                    </>
                  )}
                  <SetBtn
                    onClick={(e: React.FormEvent<HTMLElement>) =>
                      onBtnClick("DEL", todo, e)
                    }
                  >
                    <i className="fa-solid fa-trash" />
                  </SetBtn>
                </>
              )}
            </SetGrp>
          </ShowCt>
          {addTg && currentTodo.id === todo.id && (
            <AddCt>
              <TodoTypeInput type="ADD" />
            </AddCt>
          )}
          {repeat && todo.comment && !todo.isFold && (
            <Todo recursiveData={todo.comment} />
          )}
        </Content>
      ))}
    </Container>
  );
}
