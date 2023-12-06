import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import {
  cmpTodo,
  delTodo,
  hideTodo,
  ITodoState,
} from "../redux/todo/todoSlice";
import { checkEmptyArr, optionColor } from "../utils";
import Todos from "./Todos";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 2px 0;
`;
const ContentPlus = styled.div`
  transition: 0.1s all ease-in-out;
  opacity: 0;
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
    ${ContentPlus} {
      opacity: 1;
    }
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

const Content = styled.div<{ $cmp?: boolean }>`
  display: grid;
  grid-template-columns: 95% 5%;
  align-items: center;
  div:nth-child(1) {
    // content box 1
    display: flex;
    align-items: center;
    h1 {
      margin-left: 10px;
      font-size: 15px;
    }
  }
`;
const ContentEditGrp = styled.div`
  // in content box 1
  margin-right: 10px;
  i {
    margin: 0 4px;
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
const ContentOption = styled.div<{ $color: string }>`
  place-self: end;
  color: ${(props) => props.$color};
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px;
`;

const AddBox = styled.div``;

interface ITodoProps {
  todoData: ITodoState;
}

export interface IToggleState {
  add: boolean;
  fix: boolean;
}
export default function Todo({ todoData }: ITodoProps) {
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState<IToggleState>({
    add: false,
    fix: false,
  });

  const onClickFold = (e: React.FormEvent<HTMLElement>) => {
    if (checkEmptyArr(todoData.comment)) {
      e.preventDefault();
    } else dispatch(hideTodo(todoData.id));
  };
  const onClickCmp = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(cmpTodo(todoData.id));
  };
  const onClickAdd = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // addct 불필요한 재생성 방지
    if (toggle.add) {
      // add버튼 true 경우 addCt다시 제거
      setToggle((prev) => {
        return {
          ...prev,
          add: false,
        };
      });
    } else
      setTimeout(() => {
        setToggle((prev) => {
          return {
            ...prev,
            add: true,
          };
        });
      }, 50);
  };
  const onClickFix = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    setToggle((prev) => {
      return {
        ...prev,
        fix: !prev.fix,
      };
    });
  };
  const onClickDel = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    if (window.confirm("test")) {
      dispatch(delTodo(todoData.id));
    }
  };
  return (
    <Container>
      <ViewBox $cmp={todoData.completed} onClick={onClickFold}>
        <IsFold>
          {!checkEmptyArr(todoData.comment) && ( // comment가 존재할 경우
            <div>
              {todoData.isHide ? (
                <i className="fa-solid fa-angle-right" />
              ) : (
                <i className="fa-solid fa-angle-down" />
              )}
            </div>
          )}
        </IsFold>
        <Content>
          <div>
            <ContentEditGrp>
              {true && (
                <>
                  <i className="fa-solid fa-pen" onClick={onClickFix} />
                  <i className="fa-solid fa-trash" onClick={onClickDel} />
                </>
              )}
            </ContentEditGrp>
            {checkEmptyArr(todoData.comment) ? (
              <i className="fa-solid fa-minus" />
            ) : (
              <i className="fa-solid fa-bars-staggered" />
            )}
            <h1>
              {!toggle.fix ? (
                todoData.text
              ) : (
                <TodoTypeInput
                  type="FIX"
                  todoState={todoData}
                  setTgFunction={setToggle}
                />
              )}
            </h1>
            {todoData.option !== "NONE" && (
              <ContentOption $color={optionColor(todoData.option)}>
                {todoData.option}
              </ContentOption>
            )}
          </div>
          <ContentPlus
            onClick={(e: React.FormEvent<HTMLElement>) => {
              e.stopPropagation();
            }}
          >
            <div onMouseDown={onClickAdd}>
              <i className="fa-solid fa-plus" />
            </div>
          </ContentPlus>
        </Content>
        <IsCheck onClick={onClickCmp}>
          {checkEmptyArr(todoData.comment) && (
            <i className="fa-solid fa-check" />
          )}
        </IsCheck>
      </ViewBox>
      <AddBox>
        {toggle.add && (
          <TodoTypeInput
            type="ADD"
            todoState={todoData}
            setTgFunction={setToggle}
          />
        )}
      </AddBox>
      {!todoData.isHide && <Todos recursiveData={todoData.comment} />}
    </Container>
  );
}
