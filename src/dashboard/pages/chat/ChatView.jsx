import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ConversationNavbar from './components/ConversationNavbar';
import ConversationsBox from './components/ConversationsBox';
import MessagesField from './components/MessagesField';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getMoreMessages,
  getUserChat,
  setReadMessages,
} from '../../../store/slices/whatsApp/thunks';
import { Loader } from '../../../components/Loader';
import { toast } from 'react-toastify';
import Pusher from 'pusher-js';
import { useTranslation } from 'react-i18next';

const ChatView = () => {
  // const [messagesReponseState , setMessageResponseState] = useState(onechat?.data)
  const { onechat } = useSelector((state) => state.whatsApp);
  //const [messagesReponseState , setMessageResponseState] = useState(onechat?.data)

  const [sortMessages, setSortMessages] = useState([]);
  const [pageNumber, setPageNumber1] = useState(1);
  const dispatch = useDispatch();
  const { id, thread } = useParams();
  const { loading } = useSelector((state) => state.whatsApp);
  const [hasMoreChats, setHasMoreChats] = useState(1);
  const [hasChange, setHasChange] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [responseUser, setResponseUser] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [notificationBody, setNotificationBody] = useState([]);
  const [notificationContact, setNotificationContact] = useState([]);
  const language = localStorage.getItem('i18nextLng');

  const playSound = () => {
    //const audioElement = new Audio('/public/images/whistle-campana-whatsapp.mp3');
    //  audioElement.play();
  };
  const allMessages = [];

 useEffect(() => {

   //Pusher.logToConsole = true;
   const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
   const channel = pusher.subscribe('chat');
   channel.bind('message', function (data) {
    // playSound();
     allMessages.push(data);
     const jsonObject = JSON.parse(data.message);
     console.log('jsonObject',jsonObject)
     jsonObject.thread.contact;
     jsonObject.body;
     setNotificationBody(jsonObject.body);
     setNotificationContact(jsonObject.thread.contact);
    //  toast.error(`${jsonObject.thread.name}:${jsonObject.body}`,{
    //    autoClose: false
    //  })
      toast.error(t(`new_message`),{
       autoClose: false
     })
     loadChats()
   });
 }, []);

  const loadChats = async () => {
    const resp = await dispatch(getUserChat(id));
    if (resp) {
      const reversedArray = sortArray(resp?.data?.data?.data);
      console.log('reverrrrr', reversedArray);
      const markAsRead = reversedArray
        .filter((item) => item.Contact === item.from) 
        .map((item) => item.id); 

      console.log('mard as read', markAsRead);
      dispatch(setReadMessages(markAsRead));
      setSortMessages(reversedArray);
      setHasMoreChats(resp?.data?.data?.last_page);
    }
  };
  useEffect(() => {
    loadChats();
  }, [id, hasChange]);

  const sortArray = (arrayResponse) => {
    const array = arrayResponse;
    const copyArray = [...array];
    const reversedArray = copyArray.reverse();
    return reversedArray;
  };

  const loadMoreChats = async () => {
    let page = 0;
    if (pageNumber === 0) {
      page = pageNumber + 2;
    } else {
      page = pageNumber + 1;
    }
    // const pageNumberCounter = pageNumber + 1;
    setPageNumber1(page);
    const response = await dispatch(getMoreMessages(thread, page));
    if (response && response?.data) {
      const reversedArray = sortArray(response?.data?.data?.data);
      const markAsRead = reversedArray?.map((item) => item.id);
      console.log('mard as read', markAsRead);
      dispatch(setReadMessages(markAsRead));
      setSortMessages((prevChats) => [...reversedArray, ...prevChats]);
      setHasMoreChats(response?.data?.data?.last_page);
    } else {
      toast.error(t('error'));
    }
  };

  useEffect(() => {
    dispatch(getUserChat(id));
  }, [id, thread, hasChange]);

  return (
    <DashboardLayout>
      {loading && <Loader />}
      <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
        <Grid item xs={12}>
          <ConversationNavbar user={id} />
        </Grid>
        <Grid item xs={12}>
          <ConversationsBox
            loadMoreChats={loadMoreChats}
            pageNumber={pageNumber}
            messages={sortMessages}
            hasMoreChats={hasMoreChats}
          />
        </Grid>
        <Grid item xs={12}>
          <MessagesField
            setHasChange={setHasChange}
            loadChats={loadChats}
            setNewMessage={setNewMessage}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default ChatView;
