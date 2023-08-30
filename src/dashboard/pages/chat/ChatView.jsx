import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ConversationNavbar from './components/ConversationNavbar';
import ConversationsBox from './components/ConversationsBox';
import MessagesField from './components/MessagesField';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserChat, sendMessage } from '../../../store/slices/whatsApp/thunks';
import { Loader } from '../../../components/Loader';

const ChatView = () => {
const { onechat } = useSelector((state) => state.whatsApp);
const [messagesReponseState , setMessageResponseState] = useState(onechat?.data)

const [message, setMessage] = useState('');
const [sortMessages, setSortMessages] = useState([])
const dispatch = useDispatch();
const {id,thread} = useParams();
const { chats, loading, phoneAccounts, categoriesColors } = useSelector(
  (state) => state.whatsApp,
);


useEffect(() => {
  dispatch(getUserChat(id))
}, [id,onechat?.data?.length,thread])

  return (
    <DashboardLayout>
        {loading &&
      <Loader />}
    <Grid sx={{ display: 'flex', flexDirection: 'column',justifyContent:'start' }}>
      <Grid item xs={12}>
        <ConversationNavbar user={id} />
      </Grid>
      <Grid item xs={12}>
        <ConversationsBox messages={onechat?.data && onechat?.data}/>
      </Grid>
      <Grid item xs={12}>
        <MessagesField  setMessage={setMessage} setNewMessage={setMessageResponseState} messages={messagesReponseState}/>
      </Grid>
    </Grid>
    </DashboardLayout>
  );
};

export default ChatView;
