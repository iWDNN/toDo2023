import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { cmpTodo, delTodo, ITodoState } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  min-width: 480px;
  margin-left: 20px;
  user-select: none;
`;
const Content = styled.div``;
const ShowCt = styled.div<{ cmp: boolean }>`
  height: 40px;
  display: grid;
  grid-template-columns: 8% 77% 15%;
  align-items: center;
  margin: 10px 0;
  border-left: 3px solid ${(props) => (props.cmp ? "#4cd137" : "none")};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  opacity: ${(props) => props.cmp && "0.35"};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  }
  & > * {
    width: 100%;
  }
  & > div:nth-child(2) {
    h1 {
      text-decoration: ${(props) => props.cmp && "line-through"};
    }
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
const SubCt = styled.div``;

interface IToDoProps {
  recursiveData: ITodoState[];
  repeat?: boolean;
}
export default function Todo({ recursiveData, repeat = true }: IToDoProps) {
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
              dispatch(cmpTodo(todo.id));
            }}
            cmp={todo.completed}
          >
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
                !todo.completed && (
                  <SetBtn
                    onClick={(e: React.FormEvent<HTMLElement>) =>
                      onBtnClick("ADD", todo, e)
                    }
                  >
                    <i className="fa-solid fa-plus" />
                  </SetBtn>
                )
              ) : (
                <>
                  {!todo.completed && (
                    <SetBtn
                      onClick={(e: React.FormEvent<HTMLElement>) =>
                        onBtnClick("FIX", todo, e)
                      }
                    >
                      <i className="fa-solid fa-pen" />
                    </SetBtn>
                  )}
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
          {repeat && todo.comment && <Todo recursiveData={todo.comment} />}
        </Content>
      ))}
    </Container>
  );
}
