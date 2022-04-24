import React from 'react';
import styled from 'styled-components';

const StyledPre = styled.pre`
  flex: 2;
  display: block;
  padding: 10px;
  overflow: scroll;
  color: white;
  background-color: black;
  white-space: break-spaces;
`;

const PrettifyJsonOutput = ({ data }) => {
  return <StyledPre>{JSON.stringify(data, null, 2)}</StyledPre>;
};

export default PrettifyJsonOutput;
