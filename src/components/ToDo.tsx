import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { cmpTodo, ITodoState } from "../redux/todo/todoSlice";
import Todos from "./Todos";
import TodoTypeInput from "./TodoTypeInput";

const Content = styled.div`
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
  &:hover,
  &:focus {
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
const Title = styled.div<{ $cmp?: boolean }>`
  display: flex;
  align-items: center;
  h1 {
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
interface IUiState {
  isFold: boolean;
}

export default function Todo({
  todoData: { id, text, comment, completed },
}: ITodoProps) {
  const dispatch = useAppDispatch();
  const [uiState, setUiState] = useState<IUiState>({
    isFold: true,
  });

  const onClickFold = (e: React.FormEvent<HTMLElement>) => {
    e.currentTarget.focus();
    setUiState((prev) => {
      return { ...prev, isFold: !prev.isFold };
    });
  };
  const onClickCmp = (e: React.FormEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    dispatch(cmpTodo(id));
  };

  return (
    <Content>
      <ViewBox
        $cmp={completed}
        onClick={(e: React.FormEvent<HTMLElement>) => onClickFold(e)}
      >
        <IsFold>
          {JSON.stringify(comment) !== "[]" && ( // comment가 존재할 경우
            <div>
              {uiState.isFold ? (
                <i className="fa-solid fa-angle-right" />
              ) : (
                <i className="fa-solid fa-angle-down" />
              )}
            </div>
          )}
        </IsFold>
        <Title>
          <h1>{text}</h1>
        </Title>
        <IsCheck
          onClick={(e: React.FormEvent<HTMLElement>) => onClickCmp(e, id)}
        >
          <i className="fa-solid fa-check" />
        </IsCheck>
      </ViewBox>
      <AddBox>{/* <TodoTypeInput />  */}</AddBox>
      {!uiState.isFold && <Todos recursiveData={comment} />}
    </Content>
  );
}
