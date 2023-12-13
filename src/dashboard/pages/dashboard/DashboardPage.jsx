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
import NotificationBox from '../../../components/Notifications/NotificationBox';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const { isLightTheme } = useSelector((state) => state.ui);
  const language = localStorage.getItem('i18nextLng');
  const dispatch = useDispatch();

  const allMessages = [];

  useEffect(() => {
    //Pusher.logToConsole = true;
    const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      // playSound();
      allMessages.push(data);
      const jsonObject = JSON.parse(data.message);
      if (jsonObject.body) {
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
          toast.error(`${jsonObject.account.name}\n${jsonObject.thread.name}:${jsonObject.body}`, {
            autoClose: 20000,
            icon: company,
            // style:toastStyle,
            progressStyle: toastStyle,
          });
        } else {
          toast.error(`${jsonObject.from}:${jsonObject.body}`, {
            autoClose: 20000,
          });
        }
      }
    });
  }, []);

  return (
    <DashboardLayout>
      <Grid className={'container'} container>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
              {/* <img src='/images/vivechat.png' width='15%' alt='' style={{ marginTop: '20%' }} /> */}
              <Grid className='containerBoxes'>
                <Grid
                  className='notificationBox'
                  sx={{ border: '1px solid red', width: '100%', height: '100%' }}
                >
                  Notfications
                  <NotificationBox
                    userName={'Josue'}
                    bodyMessage={'Hola'}
                    stylesContainer={{
                      backgroundColor: '#fff', 
                      border: '1px solid #000' ,
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                      padding: '10px 10px',
                      margin: '5px',
                    }}
                  />
                    <NotificationBox
                    userName={'Josue'}
                    bodyMessage={'Hola'}
                    stylesContainer={{
                      backgroundColor: '#fff', 
                      border: '1px solid #000' ,
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                      padding: '10px 10px',
                      margin: '5px',
                    }}
                  />
                    <NotificationBox
                    userName={'Josue'}
                    bodyMessage={'Hola'}
                    stylesContainer={{
                      backgroundColor: '#fff', 
                      border: '1px solid #000' ,
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                      padding: '10px 10px',
                      margin: '5px',
                    }}
                  />
                    <NotificationBox
                    userName={'Josue'}
                    bodyMessage={'Hola'}
                    stylesContainer={{
                      backgroundColor: '#fff', 
                      border: '1px solid #000' ,
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                      padding: '10px 10px',
                      margin: '5px',
                    }}
                  />
                    <NotificationBox
                    userName={'Josue'}
                    bodyMessage={'Hola'}
                    stylesContainer={{
                      backgroundColor: '#fff', 
                      border: '1px solid #000' ,
                      borderRadius: '10px',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' ,
                      padding: '10px 10px',
                      margin: '5px',
                    }}
                  />
                   
                </Grid>
                <Grid
                  className='activeMessageBox'
                  sx={{ border: '1px solid yellow', width: '100%', height: '100%' }}
                >
                  Messages
                </Grid>
                <Grid className='stadisticsBox' sx={{ border: '1px solid blue' }}>
                  Statistics
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
