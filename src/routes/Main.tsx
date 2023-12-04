import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import TodoPage from "../components/TodoPage";
import { useAppSelector } from "../redux/hooks";
import {
  ITodoState,
  selFilteredTodos,
  selTodoPercent,
} from "../redux/todo/todoSlice";
import { daylist } from "../type";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  & > *:nth-child(1) {
    //header
    & > h1 {
      font-size: 2.5em;
      @media screen and (min-width: 1040px) {
        font-size: 1.5em;
      }
    }
    & > div {
      width: 100px;
    }
  }
  & > *:nth-child(2) {
    // todoinput
    margin-top: 20px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 0;
  @media screen and (max-width: 1040px) {
    font-size: 2em;
  }
  div:nth-child(1) {
    font-weight: 700;
    span:first-child {
      font-size: 2em;
    }
    span:last-child {
      font-size: 1.3em;
    }
  }
  div:nth-child(2) {
    font-weight: 600;
    font-size: 0.9em;
  }
`;
const Title = styled.h1`
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 5px;
`;
const BgBar = styled.div`
  width: 80px;
  height: 5px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.elementColor.inputBg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
`;
const Bar = styled.div<{ $percent: number }>`
  width: ${(props) => (props.$percent ? props.$percent + "%" : "0%")};
  height: 100%;
  background-color: #389729;
  border-radius: inherit;
  transition: all 0.2s ease-in-out;
`;
export default function Main() {
  const { filterId } = useParams();
  const todos = useAppSelector((state) => state.todos);
  const todoPercent = useAppSelector(selTodoPercent);
  const filteredTodos = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  );
  const [today, setToday] = useState(new Date());
  return (
    <>
      <Header>
        <Wrap>
          <DateBox>
            <div>
              <span>{daylist[today.getDay()]}</span>
              <span>요일</span>
            </div>
            <div>{<span>{today.toLocaleDateString()}</span>}</div>
          </DateBox>
          <Title>
            {todos.length
              ? filterId === "all"
                ? todoPercent + "%"
                : Number.isNaN(filteredTodos[1])
                ? "현재 탭의 일이 존재하지 않습니다"
                : filteredTodos[1] + "%"
              : "할 일을 추가해주세요"}
          </Title>
          <BgBar>
            <Bar
              $percent={
                filterId === "all" ? todoPercent : (filteredTodos[1] as number)
              }
            />
          </BgBar>
        </Wrap>
        <TodoInput />
      </Header>
      <div />
      <TodoPage />
    </>
  );
}
