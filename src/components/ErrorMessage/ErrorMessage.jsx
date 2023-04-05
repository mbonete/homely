import React from 'react';
import styled from 'styled-components';

function ErrorMessage({children}) {
  const capitalizedMessage = children.charAt(0).toUpperCase() + children.slice(1);
  return (
    <ErrorWrapper>
      <Message>{capitalizedMessage}</Message>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid red;
  border-radius: 4px;
  padding: 8px;
  margin: 4px 0;
`;

const Message = styled.p`
  color: red;
  font-size: 0.85rem;
`;


export default ErrorMessage;
