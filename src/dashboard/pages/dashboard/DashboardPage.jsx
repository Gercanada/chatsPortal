import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Loader } from '../../../components/Loader';
import { useTranslation } from 'react-i18next';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useDispatch, useSelector } from 'react-redux';
import { getApiDashBoardDetails } from '../../../store/slices/dashboard/thunks';
import { useEffect, useState } from 'react';
import GridTable from '../../../components/Tables/GridTable';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';

import './chatsStyles.css';
import ChatView from '../chat/ChatView';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [responseUser, setResponseUser] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [notificationBody, setNotificationBody] = useState([]);
  const [notificationContact, setNotificationContact] = useState([]);
  const { isLightTheme } = useSelector((state) => state.ui);
  const language = localStorage.getItem('i18nextLng');
  const { loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const getShowData = async () => {
    const resp = await dispatch(getApiDashBoardDetails());
    const arr = resp && Object.entries(resp?.data.counts).map(([key, value]) => ({ key, value }));
    setData(arr);
    setResponseUser(resp?.data.pending_items);
  };

  const playSound = () => {
    //  const audioElement = new Audio('/public/images/whistle-campana-whatsapp.mp3');
    // audioElement.play();
  };
   const allMessages = [];

  // useEffect(() => {
  //   console.log('aqui sss4444444444444444sss');
 
  //   //Pusher.logToConsole = true;
  //   const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
  //   const channel = pusher.subscribe('chat');
  //   channel.bind('message', function (data) {
  //     playSound();
  //     allMessages.push(data);
  //     const jsonObject = JSON.parse(data.message);
  //     console.log('aqui oaou', jsonObject);
  //     jsonObject.thread.contact;
  //     jsonObject.body;
  //     setNotificationBody(jsonObject.body);
  //     setNotificationContact(jsonObject.thread.contact);
  //     toast.error(`${jsonObject.thread.name}:${jsonObject.body}`,{
  //       autoClose: false
  //     })
  //   });
  // }, []);

  // useEffect(() => {
  //   Pusher.logToConsole = true;
  //   const pusher = new Pusher('a6f0142583a796bae3a3', { cluster: 'us2' });
  //   const channel = pusher.subscribe('chat');
  //   channel.bind('message', function (data) {
  //     allMessages.push(data);
  //     setMessages(allMessages);
  //   });
  // });

  useEffect(() => {
    const pendingItems = responseUser?.map((item) => ({
      ...item,
      category: t(item.category),
      item_status: t(item.item_status),
    }));
    setDataItems(pendingItems);
  }, [language, responseUser]);

  useEffect(() => {
    getShowData();
  }, []);

  return (
    <DashboardLayout>
      {loading && <Loader />}
      <Grid className={'container'} container>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
              <img src='/images/vivechat.png' width='15%' alt='' style={{ marginTop: '20%' }} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
