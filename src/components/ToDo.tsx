import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { cmpTodo, hideTodo, ITodoState } from "../redux/todo/todoSlice";
import { checkEmptyArr, todoAdapter } from "../utils";
import Todos from "./Todos";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 2px 0;
`;

const ViewBox = styled.div<{ $cmp: boolean }>`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  align-items: center;
  border-radius: 5px;
  transition: 0.1s box-shadow ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.elementColor.boxBg};
  }
  // completed effect
  opacity: ${(props) => props.$cmp && "0.5"};
  & > div:nth-child(3) {
    //check icon color
    & > i {
      color: ${(props) => props.$cmp && "#4cd137"};
      border: ${(props) => props.$cmp && "1.5px solid #4cd137"};
    }
  }
  & > div:nth-child(2) {
    //title line-through
    & > h1 {
      text-decoration: ${(props) => props.$cmp && "line-through"};
    }
  }
`;

const IsCheck = styled.div<{ $cmp?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    padding: 4px;
    font-size: 11px;
    color: #7a7a7a;
    border: 1.5px solid #7a7a7a;
    border-radius: 5px;
    transition: 0.2s all ease-in-out;
    &:hover {
      color: white;
      border: 1.5px solid white;
    }
  }
`;
const Content = styled.div<{ $cmp?: boolean }>`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 10px;
    font-size: 15px;
  }
`;
const IsFold = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    i {
      padding: 4px;
    }
  }
`;

const AddBox = styled.div``;

interface ITodoProps {
  todoData: ITodoState;
}

export default function Todo({
  todoData: { id, text, comment, completed, isHide },
}: ITodoProps) {
  const dispatch = useAppDispatch();

  const onClickFold = (e: React.FormEvent<HTMLElement>) => {
    e.currentTarget.focus();
    dispatch(hideTodo(id));
  };
  const onClickCmp = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(cmpTodo(id));
  };
  return (
    <Container>
      <ViewBox
        $cmp={completed}
        onClick={(e: React.FormEvent<HTMLElement>) => onClickFold(e)}
      >
        <IsFold>
          {!checkEmptyArr(comment) && ( // comment가 존재할 경우
            <div>
              {isHide ? (
                <i className="fa-solid fa-angle-right" />
              ) : (
                <i className="fa-solid fa-angle-down" />
              )}
            </div>
          )}
        </IsFold>
        <Content>
          {checkEmptyArr(comment) ? (
            <i className="fa-solid fa-minus" />
          ) : (
            <i className="fa-solid fa-bars-staggered" />
          )}
          <h1>{text}</h1>
        </Content>
        <IsCheck onClick={(e: React.FormEvent<HTMLElement>) => onClickCmp(e)}>
          {checkEmptyArr(comment) && <i className="fa-solid fa-check" />}
        </IsCheck>
      </ViewBox>
      <AddBox>{/* <TodoTypeInput />  */}</AddBox>
      {!isHide && <Todos recursiveData={comment} />}
    </Container>
  );
}
