import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ButtonStyle = {
  alignSelf: 'center',
};

export default function HomePage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      }
    })
  }

  const handleEventButtonClick = (isPrivate) => {
    if (isPrivate) {
      navigate('/event/private');
    } else {
      navigate('/event/public');
    }
  };

  return (
    <>
      <Header />
      <Stack spacing={5}>
        <h1>Auth Demo</h1>

        <Button variant="contained" size="large" sx={ButtonStyle} onClick={() => handleEventButtonClick(false)}>
          Create Public
        </Button>

        {!isAuthenticated && (
          <Button variant="contained" size="large" sx={ButtonStyle} onClick={handleLogin}>
            login
          </Button>
        )}
        {isAuthenticated && (
          <Button variant="contained" size="large" sx={ButtonStyle} onClick={() => handleEventButtonClick(true)}>
            Create Private
          </Button>
        )}

      </Stack>
    </>
  );
}