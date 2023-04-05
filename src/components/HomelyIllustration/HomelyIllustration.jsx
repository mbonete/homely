import React from 'react';
import styled from 'styled-components';

function HomelyIllustration({...delegated}) {
  return (
    <IllustrationWrapper {...delegated}>
      <SVG src='/HomelyLogo.svg' alt='' />
    </IllustrationWrapper>
  )
}

const IllustrationWrapper = styled.div`
  width: 25%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SVG = styled.img`
  height: 60%;
`;

export default HomelyIllustration;
