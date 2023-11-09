import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

const Days = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Day = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #d0d0d0;
  span {
    font-size: 24px;
    font-weight: 700;
  }
`;

const Today = styled.div`
  font-size: 64px;
  color: #000;
`;

export default function Progress() {
  return (
    <Container>
      {/* <Days>
        <Day>
          <span>1</span>
        </Day>
        <Day>
          <span>2</span>
        </Day>
        <Day>
          <span>3</span>
        </Day>
        <Day>
          <span>4</span>
        </Day>
        <Day>
          <span>5</span>
        </Day>
        <Day>
          <span>6</span>
        </Day>
        <Day>
          <span>
            <Today>7</Today>
          </span>
        </Day>
        <Day>
          <span>8</span>
        </Day>
        <Day>
          <span>9</span>
        </Day>
        <Day>
          <span>10</span>
        </Day>
        <Day>
          <span>11</span>
        </Day>
        <Day>
          <span>12</span>
        </Day>
        <Day>
          <span>13</span>
        </Day>
      </Days> */}
    </Container>
  );
}
