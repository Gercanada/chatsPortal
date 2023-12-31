import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
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
  const [sortMessages, setSortMessages] = useState([]);
  const [pageNumber, setPageNumber1] = useState(1);
  const dispatch = useDispatch();
  const { id, thread } = useParams();
  const { loading, loadingAccount } = useSelector((state) => state.whatsApp);
  const [hasMoreChats, setHasMoreChats] = useState(1);
  const [hasChange, setHasChange] = useState(false);
  const { t } = useTranslation();
  const [conversationsCache, setConversationsCache] = useState({});

  const playSound = () => {
    //const audioElement = new Audio('/public/images/whistle-campana-whatsapp.mp3');
    //  audioElement.play();
  };
  const allMessages = [];

  const chatId=localStorage.getItem('chat_id');
  const pusherChannel = useRef(null);

  useEffect(() => {
    const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
    const channel = pusher.subscribe('chat');
    pusherChannel.current = pusher.subscribe('chat');
    let userThread = '';
    pusherChannel.current.bind('message', function(data) {
      allMessages.push(data);
      const jsonObject = JSON.parse(data.message);
      console.log('jsonObject',jsonObject)
      localStorage.setItem(`message_id`, JSON.stringify(jsonObject.id));
      const messageId = localStorage.getItem(`message_id`);
      console.log('messageId',parseInt(messageId))
      if (jsonObject.error) {
        if(jsonObject.thread_id === parseInt(chatId) && messageId !== jsonObject.id ){
          loadChatsNoRead();
        }
      }else{

        if(jsonObject.status === 'sent'  ||jsonObject.status==='delivered' ){
          if(jsonObject.thread_id === parseInt(chatId)){
            loadChatsNoRead();
          }
        }else{
        jsonObject.thread.contact;
        jsonObject.body;
        userThread = jsonObject.thread.id;
        let color = '';
        let company = '';
        jsonObject.account.name === 'Vivetel Networks Ltd'
          ? ((company = <img src='/images/ViveTel.png' width='30px' alt='' />), (color = 'blue'))
          : jsonObject.account.name === 'ViveCanada Edu Services LTD'
          ? ((company = <img src='/images/ViveCanada.png' width='30px' alt='' />),
            (color = 'orange'))
          : jsonObject.account.name === 'Test Number'
          ? ((company = <img src='/images/labores.png' width='30px' alt='' />), (color = 'blue'))
          : jsonObject.account.name === 'Immcase Digital Solutions Ltd'
          ? ((company = <img src='/images/ImmCaseChat.png' width='30px' alt='' />),
            (color = 'green'))
          : jsonObject.account.name === 'Easy Eta by Ger Canada'
          ? ((company = <img src='/images/GerCanadaChat.png' width='30px' alt='' />),
            (color = 'purple'))
          : '';

        const toastStyle = {
          backgroundColor: color,
        };
        if (jsonObject.account) {
          toast.error(`${'\n'}${jsonObject.thread.name}:${jsonObject.body}`, {
            autoClose: 20000,
            icon: company,
            progressStyle: toastStyle,
          });
        } else {
          toast.error(`${jsonObject.from}:${jsonObject.body}`, {
            autoClose: 20000,
          });
        }
        if (userThread === parseInt(thread)) {
          loadChats();
        }
      }
      }
    });
    return () => {
      if (pusherChannel.current) {
        pusher.unsubscribe('chat');
        pusherChannel.current = null;
      }
    };
  }, [chatId]);

  const loadChats = async () => {
    const resp = await dispatch(getUserChat(thread));
    if (resp) {
      const reversedArray = sortArray(resp?.data?.data?.data);
      setConversationsCache((prevCache) => ({
        ...prevCache,
        [thread]: reversedArray,
      }));
      localStorage.setItem(`conversation_${thread}`, JSON.stringify(reversedArray));
      dispatch(setReadMessages(thread));
      setSortMessages(reversedArray);
      setHasMoreChats(resp?.data?.data?.last_page);
    }
  };

  const loadChatsNoRead = async () => {
    const resp = await dispatch(getUserChat(thread));
    if (resp) {
      const reversedArray = sortArray(resp?.data?.data?.data);
      setConversationsCache((prevCache) => ({
        ...prevCache,
        [thread]: reversedArray,
      }));
      localStorage.setItem(`conversation_${thread}`, JSON.stringify(reversedArray));
      setSortMessages(reversedArray);
      setHasMoreChats(resp?.data?.data?.last_page);
    }
  };

  useEffect(() => {
    loadChats();
  }, [id, thread]);

  useEffect(() => {
    loadChatsNoRead();
  }, [hasChange]);

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
    setPageNumber1(page);
    const response = await dispatch(getMoreMessages(thread, page));
    if (response && response?.data) {
      const reversedArray = sortArray(response?.data?.data?.data);
      dispatch(setReadMessages(thread));
      setSortMessages((prevChats) => [...reversedArray, ...prevChats]);
      setHasMoreChats(response?.data?.data?.last_page);
    } else {
      toast.error(t('error'));
    }
  };

  useEffect(() => {
    dispatch(getUserChat(thread));
  }, [id, thread, hasChange]);

  const loadConversation = async (conversationId) => {
    if (conversationsCache[conversationId]) {
      setSortMessages(conversationsCache[conversationId]);
    } else {
      const cachedData = localStorage.getItem(`conversation_${conversationId}`);
      if (cachedData) {
        const conversationData = JSON.parse(cachedData);
        setSortMessages(conversationData);
      } else {
        try {
          const resp = await dispatch(getUserChat(conversationId));
          if (resp) {
            const reversedArray = sortArray(resp?.data?.data?.data);
            dispatch(setReadMessages(thread));
            setSortMessages(reversedArray);
            setConversationsCache((prevCache) => ({
              ...prevCache,
              [conversationId]: reversedArray,
            }));
            localStorage.setItem(`conversation_${conversationId}`, JSON.stringify(reversedArray));
          }
        } catch (error) {
          console.error('Error al cargar la conversación', error);
        }
      }
    }
  };

  useEffect(() => {
    loadConversation(thread);
  }, [thread, conversationsCache]);

  return (
    <DashboardLayout>
      {loadingAccount && <Loader />}
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
          <MessagesField setHasChange={setHasChange} loadChats={loadChatsNoRead} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default ChatView;