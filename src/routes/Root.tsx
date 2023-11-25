import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";

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

function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    pathname === "/" && navigate("todo/all");
  }, []);
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Root;
