import { Card, Grid, Typography } from '@mui/material';
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
      <Card
        sx={
          loading
            ? { display: 'none' }
            : {
                mt: 2,
                padding: '20px',
              }
        }
      >
        <Typography className='animate__animated animate__fadeInLeft' variant='h1' component='h1'>
          {t('menu_dashboard')}
        </Typography>
      </Card>

      <Grid
        sx={
          loading
            ? { display: 'none' }
            : {
                mt: 1,
              }
        }
        container
      >
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            {item?.key === 'active_checklists' ||
            item?.key === 'pending_items' ||
            item?.key === 'active_cases' ? (
              <Grid item xs={12} md={4}>
                <Card sx={{ padding: 2, mr: 1, display: 'flex' }}>
                  <Grid
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    item
                    xs={12}
                    md={3}
                  >
                    {item?.key === 'active_checklists' ? (
                      <AssignmentTurnedInIcon sx={{ color: '#57CA22', fontSize: '60px' }} />
                    ) : item?.key === 'active_cases' ? (
                      <PersonIcon sx={{ color: '#57CA22', fontSize: '60px' }} />
                    ) : item?.key === 'pending_items' ? (
                      <ArticleIcon sx={{ color: '#57CA22', fontSize: '60px' }} />
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography variant='h5'>
                        {' '}
                        <b>{t(item?.key)}</b>
                      </Typography>
                    </Grid>
                    <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                      <Typography sx={{ fontWeight: 'bold' }} variant='h3'>
                        {item?.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ) : (
              ''
            )}
          </React.Fragment>
        ))}
      </Grid>

      {/* Educacion */}
      <Card
        className='animate__animated animate__fadeInUp'
        sx={
          loading
            ? { display: 'none' }
            : {
                paddingLeft: '20px',
                paddingRight: '20px',
                mt: 1,
                mb: 1,
                pb: 3,
              }
        }
      >
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '30px', paddingTop: '40px', paddingBottom: '20px' }}
          variant='h2'
          component='h2'
        >
          {t('my_cases')}
        </Typography>
        <GridTable
          path='/cases/completed'
          title={t('my_completed_cases')}
          noInfo={t('no_completed_cases')}
          group='/cases'
          prefix='cases'
          columns={[
            {
              field: 'title',
              headerName: t('title'),
              sortable: false,
              renderCell: (params) => (
                <Link
                  style={
                    isLightTheme === false
                      ? {
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: 'white',
                        }
                      : { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
                  }
                  to={`/cases/${params.id}/active/pendingcases`}
                >
                  {params.value}
                </Link>
              ),
              flex: 1,
              align: 'center',
            },
            {
              field: 'type',
              headerName: t('type'),
              sortable: false,
              flex: 1,
              align: 'center',
            },
            {
              field: 'status',
              headerName: t('status'),
              flex: 1,
              align: 'center',
              sortable: false,
            },
          ]}
        />
        <GridTable
          path='/cases/active'
          title={t('my_active_cases')}
          noInfo={t('no_active_cases')}
          group='/cases'
          prefix='cases'
          columns={[
            {
              field: 'title',
              headerName: t('title'),
              sortable: false,
              renderCell: (params) => (
                <Link
                  style={
                    isLightTheme === false
                      ? {
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: 'white',
                        }
                      : { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
                  }
                  to={`/cases/${params.id}/active/pendingcases`}
                >
                  {params.value}
                </Link>
              ),
              flex: 1,
              align: 'center',
            },
            {
              field: 'type',
              headerName: t('type'),
              sortable: false,
              flex: 1,
              renderCell: (params) => (
                <Link
                  style={{ color: isLightTheme === false ? 'white' : '' }}
                  to={`/cases/${params.id}/active/completedcases`}
                >
                  {params.value}
                </Link>
              ),
              align: 'center',
            },
            {
              field: 'status',
              flex: 1,
              headerName: t('status'),
              width: 240,
              align: 'center',
              sortable: false,
            },
          ]}
        />
      </Card>

      <Card
        className='animate__animated animate__fadeInUp'
        sx={
          loading
            ? { display: 'none' }
            : {
                paddingLeft: '20px',
                paddingRight: '20px',
                mt: 1,
                mb: 1,
                pb: 3,
              }
        }
      >
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '30px', paddingTop: '40px', paddingBottom: '20px' }}
          variant='h2'
          component='h2'
        >
          {t('my_pending_documents')}
        </Typography>

        <GridTable
          rowData={dataItems}
          title={t('my_pending_documents')}
          noInfo={t('no_pending_documents')}
          columns={[
            // { field: 'id', headerName: 'ID', flex: 1, align: 'center', sortable: false },
            {
              field: 'subject',
              headerName: t('subject'),
              sortable: false,
              flex: 1,
              align: 'center',
              renderCell: (params) => (
                <Link
                  style={
                    isLightTheme === false
                      ? {
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: 'white',
                        }
                      : { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
                  }
                  to={`/checklist/${params.row.cf_1216}/active/items`}
                >
                  {params.value}
                </Link>
              ),
            },
            {
              field: 'item_status',
              headerName: t('item_status'),
              flex: 1,
              align: 'center',
              sortable: false,
            },
            {
              field: 'category',
              headerName: t('category_id'),
              flex: 1,
              align: 'center',
              sortable: false,
            },
          ]}
        />
      </Card>

      {/* {loading && <Loader />} */}
    </DashboardLayout>
  );
};
