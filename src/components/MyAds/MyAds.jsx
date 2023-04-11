import React from 'react';
import { useAPI } from '../../hooks/useAPI';
import { useQuery } from '@tanstack/react-query';
import AdsList from '../AdsList/AdsList';
import LinkButton from '../LinkButton/LinkButton';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';

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


  if (isLoading) return <p>Loading...</p>;
  if (!myAds.length) return (
    <div>
      <p>No ads published yet</p>
        <LinkButton to='/adform' style={{width: 'fit-content', backgroundColor: 'orange', borderRadius: '50px', marginRight: '16px'}}>
          <AddHomeOutlinedIcon style={{fontSize: '1.75rem', marginBottom: '4px', marginRight: '4px'}} />
          List your property
        </LinkButton>
    </div>
    
  )
  return <AdsList ads={myAds}/>;
}

export default MyAds;