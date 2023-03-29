import React from 'react';
import { useAPI } from '../../hooks/useAPI';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import AdCard from '../AdCard/AdCard';

function AdsList() {
  const { getAds } = useAPI();
  
  const adsQuery = useQuery(
    ["ads"],
    async () => {
      const { data } = await getAds();
      return data;
    },
  );
  const ads = adsQuery.data;

  console.log(adsQuery);
  return (
    <Wrapper>
      {adsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
          ads?.map((ad) => (
              <AdCard ad={ad} key={ad.id}/>
            )
          )
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  align-items: flex-start;
  padding: 32px;
`;
export default AdsList;
