import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import GridTable from '../../../../components/Tables/GridTable';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Loader } from '../../../../components/Loader';

export const details = [
  { name_: 'Cliente ID', key: 'client_id', type: 'select', fetch_to: 'resource/clients' },
  { name_: 'Status ID', key: 'status_id', type: 'select', fetch_to: 'resource/clients' },
  { name_: 'Category ID', key: 'category_id', type: 'select', fetch_to: 'resource/clients' },
  { name_: 'Open Date', key: 'open_date', type: 'date', fetch_to: 'resource/clients' },
];

export const CasesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLightTheme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.pagination);

  const onSubmit = async (formDataParam) => {
    const formData = {};
    Object.keys(formDataParam).forEach((item) => {
      if (
        typeof formDataParam[item] === 'object' &&
        formDataParam[item]?.value &&
        formDataParam[item]?.label
      ) {
        formData[item] = formDataParam[item].value;
      } else if (moment.isMoment(formDataParam[item])) {
        formData[item] = formDataParam[item].format('YYYY-MM-DD');
      } else {
        formData[item] = formDataParam[item];
      }
    });
  };

  useEffect(() => {}, []);

  const toScreen = () => {
    navigate(`/immigration/cases/create`);
  };

  return (
    <DashboardLayout>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }}>
        <Card  sx={loading ? { display: 'none' } : { marginTop: '10px' }}>
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
                align: 'center',
              },
              {
                field: 'status',
                headerName: t('status'),
                width: '210',
                flex: 1,
                align: 'center',
                sortable: false,
              },
            ]}
          />
        </Card>
      </Grid>
      <Card  sx={loading ? { display: 'none' } : { marginTop: '10px' }}>
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
                  style={{ color: isLightTheme === false ? 'white' : '' }}
                  to={`/cases/${params.id}/active/completedcases`}
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
            { field: 'status', headerName: t('status'), flex: 1, align: 'center', sortable: false },
          ]}
        />
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
