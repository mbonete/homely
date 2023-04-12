import React from 'react';
import styled from 'styled-components';

function Main({children}) {
  return (
    <Wrapper>
      <MaxWidthWrapper>
        {children}
      </MaxWidthWrapper>
    </Wrapper>
  ) 
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const MaxWidthWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 64px;
  max-width: 1900px;
  padding: 8px 16px;
  margin: 0 auto;
  overflow: hidden;
`;

export default Main;
