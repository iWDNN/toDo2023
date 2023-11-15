import React from "react";
import styled from "styled-components";
import ToDoInput from "../components/ToDoInput";
import ToDos from "../components/ToDos";

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

function Root() {
  return (
    <Container>
      <Header>
        <Title>.</Title>
      </Header>
      <ToDoInput />
      <ToDos />
    </Container>
  );
}

export default Root;
