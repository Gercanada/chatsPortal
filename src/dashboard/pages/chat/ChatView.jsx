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
}, [id,onechat?.data?.length])

// useEffect(() => {
//   const interval = setInterval(() => {
//     dispatch(getUserChat(id));
//     sortArray();
//   }, 15000); // 15000 milisegundos = 15 segundos

//   return () => {
//     clearInterval(interval); 
//   };
// }, [id, onechat?.data?.length, dispatch]); //


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
    setSortMessages(sortValues)
  }
};

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
        <MessagesField  setMessage={setMessage} setNewMessage={setMessageResponseState} messages={messagesReponseState}/>
      </Grid>
    </Grid>
    </DashboardLayout>
  );
};

export default ChatView;
