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
  const { onechat } = useSelector((state) => state.whatsApp);
const [messagesReponseState , setMessageResponseState] = useState(onechat?.data)

const [message, setMessage] = useState('');
const [sortMessages, setSortMessages] = useState([])
const dispatch = useDispatch();
const {id} = useParams();

useEffect(() => {
  dispatch(getUserChat(id))
  sortArray();
  //console.log("onechat?.data[04444444444444444444444444]",onechat?.data[0])
}, [id,onechat?.data?.length])

const handleSendMessage = async() => {
 const resp = await dispatch(sendMessage(id,message))
 if(resp===200){
  dispatch(getUserChat(id))
 }
}

const sortArray = () => { 
  
  const originalData = onechat?.data;
  if (originalData) {
    const sortValues = [...originalData].reverse();
    console.log('sortValues', sortValues);
    setSortMessages(sortValues)
  }
};

console.log('onechat',onechat?.data)


  return (
    <DashboardLayout>
    <Grid sx={{ display: 'flex', flexDirection: 'column',justifyContent:'start' }}>
      <Grid item xs={12}>
        <ConversationNavbar user={id} />
      </Grid>
      <Grid item xs={12}>
        <ConversationsBox messages={onechat?.data && onechat?.data}/>
      </Grid>
      <Grid item xs={12}>
        <MessagesField id={id} setMessage={setMessage} setNewMessage={setMessageResponseState} messages={messagesReponseState}/>
      </Grid>
    </Grid>
    </DashboardLayout>
  );
};

export default ChatView;
