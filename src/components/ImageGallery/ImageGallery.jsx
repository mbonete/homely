import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function ImageGallery() {
  return (
    <Box sx={{width: 750, height: 800, overflowY: 'hidden' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: '/apartment1.jpg',
    title: 'Bed',
  },
  {
    img: '/apartment2.jpg',
    title: 'Books',
  },
  {
    img: '/apartment3.jpg',
    title: 'Sink',
  },
  {
    img: '/apartment4.jpg',
    title: 'Kitchen',
  },
  {
    img: '/apartment5.jpg',
    title: 'Blinds',
  },
  {
    img: '/apartment6.jpg',
    title: 'Chairs',
  },
  {
    img: '/apartment7.jpg',
    title: 'Laptop',
  },
  {
    img: '/apartment8.jpg',
    title: 'Doors',
  },
  {
    img: '/apartment9.jpg',
    title: 'Coffee',
  },
  {
    img: '/apartment10.jpg',
    title: 'Storage',
  },
  {
    img: '/apartment11.jpg',
    title: 'Candle',
  },
  {
    img: '/apartment12.jpg',
    title: 'Coffee table',
  },
];

export default ImageGallery;
