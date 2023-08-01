import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ConversationNavbar from './components/ConversationNavbar';
import ConversationsBox from './components/ConversationsBox';
import MessagesField from './components/MessagesField';
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
    },

    {
      id: 4,
      message_type: 'request',
      message: 'al millon papu',
      avatar: null,
      username: 'heriberto',
      name: 'Heriberto',
      last_name: 'Hernandez',
      email: 'heriberto.h@gercanada.com',
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
    },
  ],
};

const ChatView = () => {
const [messagesReponseState , setMessageResponseState] = useState(messagesReponse)

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column',justifyContent:'start' }}>
      <Grid item xs={12}>
        <ConversationNavbar />
      </Grid>
      <Grid item xs={12}>
        <ConversationsBox messages={messagesReponseState}/>
      </Grid>
      <Grid item xs={12}>
        <MessagesField setNewMessage={setMessageResponseState} messages={messagesReponseState}/>
      </Grid>
    </Grid>
  );
};

export default ChatView;
