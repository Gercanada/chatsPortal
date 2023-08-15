import { Avatar, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../../../components/Loader';

const ConversationsBox = ({ messages }) => {
  const newMessageRef = useRef(null);

  const backgroundImageUrl = '/images/que-ver-en-vancouver.jpg';
  //const backgroundImageUrl = '/public/images/immcaselogo.png';
  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '75vh',
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'end',
    overflow: 'auto',
  };
  const { loading } = useSelector((state) => state.whatsApp);

  useEffect(() => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  console.log('messages', messages);
  return (
    <Grid container style={gridStyle}>
      {loading && <Loader />}
      <Grid item xs={12}>
        {messages?.map((item, index) =>
          item?.Contact === item?.from ? (
            <Grid
              key={index}
              ref={index === messages.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
              }}
            >
                {item?.has_media === 0 ? (
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '40%' }}>
                {/* <Avatar alt='user_photo' src={''} /> */}
            
                  <TextField
                    value={item?.body}
                    disabled
                    multiline
                    sx={{ m: 1, width: '100%' }}
                    variant='filled'
                  />

              </Card>
              ) : (
                            
                <Typography
                    variant='h1'
                    component='h6'
                    sx={{ textAlign: 'center', ml: 10 }}
                    display='flex'
                  >
                    <img src={`https://chat.immcase.com/${item?.media_url}`} width='100px' alt='' />
                  </Typography>
                )}
            </Grid>
          ) : (
            <Grid
              key={index}
              ref={index === messages.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '40%' }}>
                {/* <Avatar alt='user_photo' src={''} /> */}
                <TextField
                  value={item?.body}
                  disabled
                  multiline
                  sx={{ m: 1, width: '100%' }}
                  variant='filled'
                />
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
