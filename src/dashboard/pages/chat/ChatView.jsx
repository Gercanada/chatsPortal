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
} from '../../../store/slices/whatsApp/thunks';
import { Loader } from '../../../components/Loader';
import { toast } from 'react-toastify';

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
  

  const loadChats = async () => {
    const resp = await dispatch(getUserChat(id));
    if (resp) {
      console.log("response",resp?.data?.data?.data)
      const reversedArray = sortArray(resp?.data?.data?.data)
      setSortMessages(reversedArray);
      setHasMoreChats(resp?.data?.data?.last_page);
    }
  };
  useEffect(() => {
    loadChats();
  }, [id,hasChange]);

  const sortArray = (arrayResponse) => {
    const array = arrayResponse
    const copyArray = [...array];
    const reversedArray = copyArray.reverse();
    return reversedArray;
  }

  const loadMoreChats = async () => {
    const pageNumberCounter = pageNumber + 1;
    setPageNumber1(pageNumberCounter);
    const response = await dispatch(getMoreMessages(thread, pageNumberCounter));
    if (response && response?.data) {
      console.log("response",response)
      const reversedArray = sortArray(response?.data?.data?.data)
      setSortMessages((prevChats) => [...reversedArray, ...prevChats]);
      setHasMoreChats(response?.data?.data?.last_page);
    } else {
      toast.error(t('error'));
    }
  };
  console.log("hasChangehasChange",hasChange)

  useEffect(() => {
    dispatch(getUserChat(id));
  }, [id,thread,hasChange]);

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
        <MessagesField  setHasChange={setHasChange} />
      </Grid>
    </Grid>
    </DashboardLayout>
  );
};

export default ChatView;
