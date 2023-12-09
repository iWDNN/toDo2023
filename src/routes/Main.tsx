import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Time from "../components/Time";
import TodoInput from "../components/TodoInput";
import TodoPage from "../components/TodoPage";
import { useAppSelector } from "../redux/hooks";
import { ITodoState, selFilteredTodos } from "../redux/todo/todoSlice";
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
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (max-width: 1040px) {
    font-size: 2em;
  }
  & > div {
    font-weight: 600;
  }
  & > div:nth-child(1) {
    // 요일
    font-size: 20px;
    span:first-child {
      font-weight: 700;
      font-size: 30px;
    }
  }
  & > div:nth-child(2) {
    // 날짜
    font-size: 16px;
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
  const reduxTodos = useAppSelector((state) => state.todos);
  const filteredPercent = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  )[1];

  const checkTitle = () => {
    let result = "";

    if (reduxTodos.length > 0) {
      result = filteredPercent + "%";
      if (Number.isNaN(filteredPercent)) {
        result = "현재 탭의 할 일이 존재하지 않습니다";
      }
    } else {
      result = "할 일을 추가해주세요";
    }
    return result;
  };
  return (
    <>
      <Header>
        <Wrap>
          <DateBox>
            <div>
              <span>{daylist[new Date().getDay()]}</span>
              <span>요일</span>
            </div>
            <div>{<span>{new Date().toLocaleDateString()}</span>}</div>
            <Time />
          </DateBox>
          <Title>{checkTitle()}</Title>
          <BgBar>
            <Bar $percent={filteredPercent} />
          </BgBar>
        </Wrap>
        <TodoInput />
      </Header>
      <div />
      <TodoPage />
    </>
  );
}
