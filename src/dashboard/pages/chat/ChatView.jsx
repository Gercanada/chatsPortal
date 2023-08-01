import { Grid } from '@mui/material';
import React from 'react';
import ConversationNavbar from './components/ConversationNavbar';
import ConversationsBox from './components/ConversationsBox';
import MessagesField from './components/MessagesField';

const ChatView = () => {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column',justifyContent:'start' }}>
      <Grid item xs={12}>
        <ConversationNavbar />
      </Grid>
      <Grid item xs={12}>
        <ConversationsBox/>
      </Grid>
      <Grid item xs={12}>
        <MessagesField/>
      </Grid>
    </Grid>
  );
};

export default ChatView;
