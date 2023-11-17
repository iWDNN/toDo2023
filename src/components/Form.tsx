import React from "react";
import styled from "styled-components";

const Ct = styled.div`
  width: 100%;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    input {
      margin-top: 10px;
      width: 80%;
      padding: 10px;
      outline: none;
      border: 2px solid #eee;
    }
  }
`;
export default function Form() {
  return (
    <Ct>
      <form>
        <input />
      </form>
    </Ct>
  );
}
