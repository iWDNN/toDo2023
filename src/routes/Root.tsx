import React from "react";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import Todos from "../components/Todos";
import { useAppSelector } from "../redux/hooks";
import { todoProgress } from "../redux/todo/todoSlice";

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48% 4% 48%;
  align-items: center;
  @media screen and (max-width: 1040px) {
    display: flex;
    flex-direction: column;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > *:nth-child(1) {
  }
  & > *:nth-child(2) {
    margin-left: 20px;
  }
  @media screen and (max-width: 1040px) {
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;
    & > *:nth-child(1) {
      & > h1 {
        font-size: 2.5em;
      }
      & > div {
        width: 100px;
      }
    }
    & > *:nth-child(2) {
      margin-top: 20px;
    }
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Bar = styled.div<{ progress: number }>`
  width: ${(props) => (props.progress ? props.progress + "%" : "0")};
  height: 100%;
  background-color: #4cd137;
  border-radius: inherit;
  transition: all 0.2s ease-in-out;
`;

function Root() {
  const todos = useAppSelector((state) => state.todos);
  const todoPercent = useAppSelector(todoProgress);
  return (
    <Container>
      <Header>
        <Wrap>
          <Title>
            {todos.length
              ? todoPercent
                ? todoPercent + "%"
                : "0%"
              : "할 일을 추가해주세요"}
          </Title>
          <BgBar>
            <Bar progress={todoPercent} />
          </BgBar>
        </Wrap>
        <TodoInput />
      </Header>
      <div />
      <Todos />
    </Container>
  );
}

export default Root;
