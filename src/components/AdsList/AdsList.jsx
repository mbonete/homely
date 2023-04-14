import React from 'react';
import styled from 'styled-components';
import AdCard from '../AdCard/AdCard';

function AdsList({ ads }) {
  return (
    <Wrapper>
      {
        ads?.map((ad) => (
          <AdCard ad={ad} key={ad.id}/>
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 100%;
`;
export default AdsList;
