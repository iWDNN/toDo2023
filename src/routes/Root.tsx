import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { DarkMode, NormalMode } from "../theme";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	color:inherit;
	text-decoration: none;
}
body{
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
}
input,select{
	background-color: ${(props) => props.theme.elementColor.inputBg};
	color: ${(props) => props.theme.textColor};	
}
:not(input,select){
  user-select: none;
}
*{
  transition: .2s all ease-in-out;
}
`;

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

  const themeToggle = useAppSelector((state) => state.storeUiState.themeTg);

  useEffect(() => {
    pathname === "/" && navigate("todo/all");
  }, []);
  return (
    <ThemeProvider theme={themeToggle ? DarkMode : NormalMode}>
      <GlobalStyle />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default Root;
