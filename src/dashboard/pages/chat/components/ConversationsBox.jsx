import { Avatar, Card, Grid, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const ConversationsBox = ({ messages }) => {
  const newMessageRef = useRef(null);

  const backgroundImageUrl = '/public/images/backgroundChat.jpg';
  //const backgroundImageUrl = '/public/images/immcaselogo.png';
  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '75vh',
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'end',
    overflow: 'auto',
  };

  useEffect(() => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages?.data]);

  return (
    <Grid container style={gridStyle}>
      <Grid item xs={12}>
        {messages?.data?.map((item, index) =>
          item?.message_type === 'response' ? (
            <Grid
            key={index}
              ref={index === messages.data.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                {/* <Avatar alt='user_photo' src={''} /> */}
                <TextField
                  value={item.message}
                  disabled
                  multiline
                  sx={{ m: 1, width: '100%' }}
                  variant='filled'
                />
              </Card>
            </Grid>
          ) : (
            <Grid
             key={index}
              ref={index === messages.data.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                {/* <Avatar alt='user_photo' src={''} /> */}
                <TextField
                  value={item.message}
                  disabled
                  multiline
                  sx={{ m: 1, width: '100%', textAlignLast: 'end' }}
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
