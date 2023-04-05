import React from 'react';
import { useAPI } from '../../hooks/useAPI';
import { useQuery } from '@tanstack/react-query';
import AdsList from '../AdsList/AdsList';

function AllAdsList() {
  const { getAds } = useAPI();
  
  const { data, isLoading } = useQuery(
    ["ads"],
    async () => {
      const { data } = await getAds();
      return data;
    },
  );

  if (isLoading) return <p>Loading...</p>;
  return <AdsList ads={data} />;
}

export default AllAdsList;
