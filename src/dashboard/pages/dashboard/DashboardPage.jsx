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

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [responseUser, setResponseUser] = useState([]);
  const [dataItems, setDataItems] = useState([]);
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
      <Grid className={'container'}  container>
        <Grid container>
          <Grid item xs={12}>
            <ChatView/>
            {/* <Card className='navbar_chat'>
            <Grid className='navbar_content'>
            <Avatar alt='user_photo' src={ ''} />
            <Typography sx={{m:1}}>
            josue rocha
            </Typography>
            </Grid>
            </Card> */}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
