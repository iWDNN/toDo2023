import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { resetTodo } from "../redux/todo/todoSlice";
import { resetPeriodLS } from "../utils";

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48% 4% 48%; //[Header.tsx, div(EmptyElement),  Todos.tsx]
  align-items: center;
  @media screen and (max-width: 1040px) {
    display: flex;
    flex-direction: column;
  }
`;

function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    pathname === "/" && navigate("todo/all");
    resetPeriodLS(dispatch, resetTodo);
  }, []);
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Root;
