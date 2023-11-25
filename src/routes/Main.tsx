import React, { useState } from "react";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import Todos from "../components/Todos";
import { useAppSelector } from "../redux/hooks";
import { selTodoPercent } from "../redux/todo/todoSlice";
import { daylist } from "../utils";
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  & > *:nth-child(1) {
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
  background-color: #1212;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Bar = styled.div<{ $percent: number }>`
  width: ${(props) => (props.$percent ? props.$percent + "%" : "0%")};
  height: 100%;
  background-color: #4cd137;
  border-radius: inherit;
  transition: all 0.2s ease-in-out;
`;
export default function Main() {
  const todos = useAppSelector((state) => state.todos);
  const todoPercent = useAppSelector(selTodoPercent);
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
              ? todoPercent
                ? todoPercent + "%"
                : "0%"
              : "할 일을 추가해주세요"}
          </Title>
          <BgBar>
            <Bar $percent={todoPercent} />
          </BgBar>
        </Wrap>
        <TodoInput />
      </Header>
      <div />
      <Todos />
    </>
  );
}
