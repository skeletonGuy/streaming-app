import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/Header/Header';
import CopyableTextField from '../../components/CopyableTextField/CopyableTextField';
import Player from '../../components/Player/Player';

export default function EventConfigPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamKey, setStreamKey] = useState(uuidv4());
  const [accessToken, setAccessToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const playerRef = React.useRef(null);
  const params = useParams();
  const streamApp = params.access === 'public' ? 'public' : 'private';
  const rtmpIngest = `${process.env.REACT_APP_RTMP_INGEST_URL}/${streamApp}`;
  const hlsURL = `${process.env.REACT_APP_HLS_RECEIVE}/${streamKey}.m3u8`;
  const playerOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: hlsURL,
      type: 'application/x-mpegURL',
    }]
  }

  useEffect(() => {
    const initAccessToken = async () => {
      setAccessToken(await getAccessTokenSilently());
    }

    initAccessToken();
  }, [getAccessTokenSilently]);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });

    player.tech().vhs.xhr.beforeRequest = function (options) {
      //const keyRegex = /key\/.{38,}\.key/;
      if (!options.headers) {
        options.headers = {};
      }

      //if (options.uri.match(keyRegex)) {
      options.headers['authorization'] = `Bearer ${accessToken}`;
      //}
    }
  };


  return (
    <>
      <Header />
      <Stack spacing={5}>
        <h1>Config {params.access} event</h1>
        <div style={{ marginLeft: 20 }}>
          <h2>RTMP Ingest:</h2>
          <CopyableTextField value={rtmpIngest} />
          <h2>Stream Key:</h2>
          <CopyableTextField value={streamKey} />
          {!isPlaying && (
            <Button variant="contained" sx={{ marginTop: 10 }} onClick={() => setIsPlaying(true)}>View</Button>
          )}
          {isPlaying && (
            <Player options={playerOptions} onReady={handlePlayerReady} />
          )}
        </div>
      </Stack>
    </>
  );
}