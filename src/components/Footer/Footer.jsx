import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <Wrapper>
      <Copyright>&copy; Maria Bonete</Copyright>
    </Wrapper>
  ) 
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: navy;
`;

const Copyright = styled.h3`
  color: white;
`;
export default Footer;
