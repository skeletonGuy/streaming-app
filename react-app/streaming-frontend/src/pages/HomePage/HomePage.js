import React from 'react';
import './HomePage.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/ListItem'

const ButtonStyle = {
  alignSelf: 'center',
};

export default function HomePage() {
  return (
    <>
      <Stack spacing={5}>
        <h1>Stream somthing</h1>

        <Button variant="contained" size="large" sx={ButtonStyle}>
          Create Public
        </Button> 

        <Button variant="contained" size="large" sx={ButtonStyle}>
         login 
        </Button> 
      </Stack>
    </>
  );
}