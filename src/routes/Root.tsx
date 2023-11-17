import React from "react";
import styled from "styled-components";
import TodoInput from "../components/TodoInput";
import Todos from "../components/Todos";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 10px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;
const TestBtn = styled.div`
  position: absolute;
  border: 2px solid black;
  padding: 3px;
`;

function Root() {
  const onTestClick = () => {};
  return (
    <Container>
      <TestBtn onClick={onTestClick}>
        <i className="fa-solid fa-play" />
      </TestBtn>
      <Header>
        <Title>Test Page</Title>
      </Header>
      <TodoInput />
      <Todos />
    </Container>
  );
}

export default Root;
