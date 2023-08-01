import { Avatar, Card, Grid, TextField } from '@mui/material';
import React from 'react';

export const messagesReponse = {
  data: [
    {
      id: 1,
      message_type: 'request',
      message: 'Hola',
      avatar: null,
      username: 'heriberto',
      name: 'Heriberto',
      last_name: 'Hernandez',
      email: 'heriberto.h@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 2,
      message_type: 'request',
      message: 'como estas?',
      avatar: null,
      username: 'heriberto',
      name: 'Heriberto',
      last_name: 'Hernandez',
      email: 'heriberto.h@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 3,
      message_type: 'response',
      message: 'bien y tu que tal?',
      avatar: null,
      username: 'josue_r',
      name: 'Josue',
      last_name: 'Rocha',
      email: 'josue.r@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },

    {
      id: 5,
      message_type: 'request',
      message: 'al millon papu',
      avatar: null,
      username: 'heriberto',
      name: 'Heriberto',
      last_name: 'Hernandez',
      email: 'heriberto.h@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },

    {
      id: 5,
      message_type: 'response',
      message: 'eso es tono',
      avatar: null,
      username: 'josue_r',
      name: 'Josue',
      last_name: 'Rocha',
      email: 'josue.r@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
  ],
};

const ConversationsBox = () => {
  const backgroundImageUrl = '/public/images/backgroundChat.jpg';
  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '78vh', // Altura del grid, puedes ajustarla según tus necesidades
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'end',
    border: '1px solid blue',
    overflow: 'auto',
    // opacity: '50%', // Ajusta la opacidad según tus preferencias
  };

  const contentStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', // Color del texto, puedes ajustarlo según el contraste con la imagen de fondo
  };

  return (
    <Grid container style={gridStyle}>
      <Grid item xs={12}>
        {/* <Grid
          sx={{
            m: 1,
            width: '98%',
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid red',
            justifyContent: 'start',
          }}
        >
          <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Avatar alt='user_photo' src={''} />
            <TextField multiline sx={{ m: 1, width: '80%' }} variant='filled' />
          </Card>
        </Grid>
        <Grid
          sx={{
            m: 1,
            width: '98%',
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid red',
            justifyContent: 'end',
          }}
        >
          <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Avatar alt='user_photo' src={''} />
            <TextField multiline sx={{ m: 1, width: '80%' }} variant='filled' />
          </Card>
        </Grid> */}
        {messagesReponse.data.map((item, index) =>
          item.message_type === 'response' ? (
            <Grid
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid red',
                justifyContent: 'start',
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                <Avatar alt='user_photo' src={''} />
                <TextField value={item.message} disabled multiline sx={{ m: 1, width: '80%' }} variant='filled' />
              </Card>
            </Grid>
          ) : (
            <Grid
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid red',
                justifyContent: 'end',
              }}
            >
              <Card sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                <Avatar alt='user_photo' src={''} />
                <TextField value={item.message} disabled multiline sx={{ m: 1, width: '80%' }} variant='filled' />
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
