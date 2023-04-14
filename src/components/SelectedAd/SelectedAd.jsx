import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAPI } from '../../hooks/useAPI';
import AdCard from '../AdCard/AdCard';

function SelectedAd() {
  const { id } = useParams();
  const { getAd } = useAPI();
  const adQuery = useQuery(
    ['ad'], 
    async () => {
      const { data } = await getAd(id);
      return data;
    },
  ) 
  return (
    <Wrapper>
      {adQuery.isLoading ? <p>Loading...</p> : <AdCard ad={adQuery.data}/>}
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  width: 40%;
`;
export default SelectedAd;
