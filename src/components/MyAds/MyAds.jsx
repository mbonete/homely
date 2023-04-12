import React from 'react';
import styled from 'styled-components';
import { useAPI } from '../../hooks/useAPI';
import { useQuery } from '@tanstack/react-query';
import AdsList from '../AdsList/AdsList';
import LinkButton from '../LinkButton/LinkButton';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import Loader from '../Loader/Loader';

function MyAds() {
  const { getAds, currentUser } = useAPI();
  
  const { data, isLoading } = useQuery(
    ["ads"],
    async () => {
      const { data } = await getAds();
      return data;
    },
  );

  const myAds = data?.filter((ad) => ad.userId === currentUser.id);


  if (isLoading) return <Loader />;
  if (!myAds.length) return (
    <Wrapper>
      <p>No ads published yet</p>
        <LinkButton to='/adform' style={{width: 'fit-content', backgroundColor: 'orange', borderRadius: '50px'}}>
          <AddHomeOutlinedIcon style={{fontSize: '1.75rem', marginBottom: '4px', marginRight: '4px'}} />
          List your property
        </LinkButton>
    </Wrapper>
    
  )
  return <AdsList ads={myAds}/>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
export default MyAds;