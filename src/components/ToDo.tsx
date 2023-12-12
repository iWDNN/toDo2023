import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  cmpTodo,
  delTodo,
  hideTodo,
  ITodoState,
} from "../redux/todo/todoSlice";
import { setEditToggle } from "../redux/uiState/uiStateSlice";
import { checkEmptyArr, optionColor } from "../utils";
import Todos from "./Todos";
import TodoTypeInput from "./TodoTypeInput";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 2px 0;
`;
const Plus = styled.div`
  /* transition: 0.1s opacity ease-in-out; */
  opacity: 0;
`;
const Title = styled.div`
  display: flex;
  flex-grow: 1;
`;
const ViewBox = styled.div<{
  $cmp: boolean;
  $editTg: number;
  $isComment: boolean;
}>`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 7% 83% 10%;
  align-items: center;
  border-radius: 5px;
  /* transition: 0.1s box-shadow ease-in-out; */
  & > div:nth-child(2) {
    border-left: ${(props) => !props.$isComment && "2px solid #454545"};
  }
  cursor: pointer;
  &:hover {
    ${Plus} {
      opacity: ${(props) => !props.$editTg && 1};
    }
    background-color: ${(props) => props.theme.elementColor.boxBg};
  }

  ${({ $cmp }) =>
    $cmp &&
    `
      ${Title}{
        opacity:0.5;
      }
      & > div:nth-child(2) { // title
        & > div:nth-child(1) {
          h1{
            text-decoration: line-through;
          }
        }
      }
      & > div:nth-child(3) {  // isCheck
        & > i {
          color: #4cd137;
          border: 1.5px solid #4cd137;
        }
      }
    `}
  ${({ $editTg }) =>
    $editTg &&
    `
    & > div:nth-child(2) {
      & > :not(div:nth-child(2)) {
        opacity: 0.7;
      }
    }
  `}
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

const ContentCt = styled.div<{ $cmp?: boolean }>`
  height: 100%;
  display: grid;
  grid-template-columns: 95% 5%;
  align-items: center;
  padding-left: 10px;
  border-radius: 2px;
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
const ContentBox = styled.div``;
const ContentEditGrp = styled.div`
  display: flex;
  align-items: center;
  i {
    margin: 0 4px;
  }
  i:nth-child(2) {
    font-size: 22px;
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
    /* transition: 0.2s all ease-in-out; */
    &:hover {
      color: #fff;
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
  const { filterId } = useParams();
  const dispatch = useAppDispatch();

  const { editTg, themeTg } = useAppSelector((state) => state.uiState);

  const [toggle, setToggle] = useState<IToggleState>({
    add: false,
    fix: false,
  });

  const onClickFold = (e: React.FormEvent<HTMLElement>) => {
    if (checkEmptyArr(todoData.comment)) {
      e.preventDefault();
    } else dispatch(hideTodo({ id: todoData.id }));
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
    e.preventDefault();
    if (toggle.fix) {
      setToggle((prev) => {
        return {
          ...prev,
          fix: false,
        };
      });
    } else {
      setTimeout(() => {
        setToggle((prev) => {
          return {
            ...prev,
            fix: true,
          };
        });
      }, 50);
    }
  };
  const onClickDel = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    if (window.confirm("제거하시겠습니까?")) {
      dispatch(delTodo(todoData.id));
    }
    if (editTg === 1) {
      dispatch(setEditToggle(0));
    }
  };
  return (
    <Container>
      <ViewBox
        $cmp={todoData.completed}
        $editTg={editTg}
        $isComment={!checkEmptyArr(todoData.comment)}
        onClick={onClickFold}
      >
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
        <ContentCt>
          <ContentBox>
            {checkEmptyArr(todoData.comment) ? ( // comment가 존재하지 않을 경우
              <i className="fa-solid fa-minus" />
            ) : todoData.isHide ? ( // comment가 존재하면서 hide가 true/false 인가
              <i className="fa-solid fa-folder" />
            ) : (
              <i className="fa-solid fa-folder-open" />
            )}
            <Title>
              {!toggle.fix ? (
                <>
                  <h1>{todoData.text}</h1>
                  {todoData.option !== "NONE" && (
                    <ContentOption
                      $color={optionColor(todoData.option, themeTg)}
                    >
                      {todoData.option}
                    </ContentOption>
                  )}
                </>
              ) : (
                <TodoTypeInput
                  type="FIX"
                  todoState={todoData}
                  setTgFunction={setToggle}
                />
              )}
            </Title>
          </ContentBox>
          <ContentEditGrp>
            {editTg ? (
              <>
                <div
                  onClick={(e: React.FormEvent<HTMLElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <i className="fa-solid fa-pen" onMouseDown={onClickFix} />
                </div>
                <i className="fa-solid fa-xmark" onClick={onClickDel} />
              </>
            ) : (
              filterId === "all" && (
                <Plus
                  onClick={(e: React.FormEvent<HTMLElement>) => {
                    e.stopPropagation();
                  }}
                >
                  {!todoData.completed && (
                    <div onMouseDown={onClickAdd}>
                      <i className="fa-solid fa-plus" />
                    </div>
                  )}
                </Plus>
              )
            )}
          </ContentEditGrp>
        </ContentCt>
        <IsCheck onClick={onClickCmp}>
          {checkEmptyArr(todoData.comment) && !editTg && (
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
