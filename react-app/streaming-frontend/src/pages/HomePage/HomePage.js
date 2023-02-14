import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ButtonStyle = {
  alignSelf: 'center',
};

export default function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      }
    })
  }

  return (
    <>
      <Header />
      <Stack spacing={5}>
        <h1>Auth Demo</h1>

        <Button variant="contained" size="large" sx={ButtonStyle}>
          Create Public
        </Button>

        {!isAuthenticated && (
          <Button variant="contained" size="large" sx={ButtonStyle} onClick={handleLogin}>
            login
          </Button>
        )}
        {isAuthenticated && (
          <Button variant="contained" size="large" sx={ButtonStyle}>
            Create Private
          </Button>
        )}

      </Stack>
    </>
  );
}