import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './chatsStyles.css';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import NotificationBox from '../../../components/Notifications/NotificationBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessagesBox from '../../../components/Messages/MessagesBox';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { useParams, useLocation } from 'react-router-dom';
import { getActiveChats, getNotifications } from '../../../store/slices/whatsApp/thunks';
import MailLockIcon from '@mui/icons-material/MailLock';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const { account } = useParams();
  const { isLightTheme } = useSelector((state) => state.ui);
  const { accountInfo, notificationsInfo, activeChats } = useSelector((state) => state.whatsApp);
  const language = localStorage.getItem('i18nextLng');
  const dispatch = useDispatch();
  let location = useLocation();
  console.log(' console.log(location.pathname);', location.pathname);
  const allMessages = [];

  useEffect(() => {
    //Pusher.logToConsole = true;
    const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      // playSound();
      allMessages.push(data);
      const jsonObject = JSON.parse(data.message);
      if (jsonObject.status === 'sent' || jsonObject.status === 'delivered') {
        if (jsonObject.thread_id === parseInt(chatId)) {
          loadChatsNoRead();
        }
      } else {
        if (`/${jsonObject.account.id}` === location.pathname) {
          jsonObject.thread.contact;
          jsonObject.body;
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
            toast.error(
              `${jsonObject.account.name}\n${jsonObject.thread.name}:${jsonObject.body}`,
              {
                autoClose: 20000,
                icon: company,
                // style:toastStyle,
                progressStyle: toastStyle,
              },
            );
          } else {
            toast.error(`${jsonObject.from}:${jsonObject.body}`, {
              autoClose: 20000,
            });
          }
          dispatch(getNotifications(account));
          dispatch(getActiveChats(account));
        }
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getNotifications(account));
    dispatch(getActiveChats(account));
  }, [account]);

  return (
    <DashboardLayout>
      <Grid className={'container'} container>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
              <Grid className='containerBoxes' container spacing={2}>
                <Grid className='notificationBox' item xs={12} md={6}>
                  <NotificationsIcon /> Notifications
                  <Grid
                    sx={{
                      overflowY: 'auto',
                      maxHeight: '420px',
                      maxWidth: '580px',
                      boxShadow: '0.1em 0.1em 0.6em rgba(0, 0, 0, 1)',
                      borderRadius: '5px',
                    }}
                  >
                    {notificationsInfo?.data?.length > 0 ? (
                      notificationsInfo?.data?.map((notify, index) => (
                        <React.Fragment key={index}>
                          <NotificationBox
                            userName={notify.threadName}
                            bodyMessage={notify.body}
                            stylesContainer={{
                              backgroundColor: '#fff',
                              border: '1px solid #000',
                              borderRadius: '10px',
                              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                              padding: '10px 10px',
                              margin: '5px',
                            }}
                          />
                        </React.Fragment>
                      ))
                    ) : (
                      <Grid>
                        <NotificationsOffIcon fontSize='large' />
                        'No data'
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  className='activeMessageBox'
                  item
                  xs={12}
                  md={6}
                  // sx={{ border: '1px solid yellow', height: '100%',  width:'100%' }}
                >
                  <ThreePIcon /> Active chats
                  <Grid
                    sx={{
                      overflowY: 'auto',
                      maxHeight: '420px',
                      maxWidth: '480px',
                      boxShadow: '0.1em 0.1em 0.6em rgba(0, 0, 0, 1)',
                      borderRadius: '15px',
                    }}
                  >
                    {activeChats.length > 0 ? (
                      activeChats?.map((chat, index) => (
                        <React.Fragment key={index}>
                          <MessagesBox
                            userName={chat.name}
                            contactnumber={chat.contact}
                            // icon={<ThreePIcon/>}
                            stylesContainer={{
                              backgroundColor: '#fff',
                              border: '1px solid #000',
                              borderRadius: '10px',
                              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                              padding: '10px 10px',
                              margin: '5px',
                            }}
                          />
                        </React.Fragment>
                      ))
                    ) : (
                      <Grid>
                        <MailLockIcon fontSize='large' />
                        'No data'
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* <Grid className='stadisticsBox' >
                  Statistics
                </Grid> */}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
