import React from 'react';
import styled from 'styled-components';

const StyledStartButton = styled.button`
  box-sizing: border-box;

  margin: 0 0 20px 0;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  min-height: 30px;
  width: 250px;
  border-radius: 20px;
  border: 4px solid green;
  color: orange;
  background: darkgreen;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
