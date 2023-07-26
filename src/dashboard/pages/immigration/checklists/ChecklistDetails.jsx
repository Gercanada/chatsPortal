import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../components/Loader';
import GoBack from '../../../../components/Navigation/GoBack';
import { getChecklistByIdDetails } from '../../../../store/slices/checklists';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { DetailsMenuBar } from '../cases/components';

export const CaseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const { checklistForDetails, loading } = useSelector((state) => state.checklists);
  const details = checklistForDetails;
  const title = details?.subject || '';
  const selectedId = id;

  const getShowData = async () => {
    if (id) await dispatch(getChecklistByIdDetails(id));
  };

  useEffect(() => {
    getShowData();
  }, [id]);

  const items = details
    ? [
        {
          navigateTo: `/checklist/${selectedId}/active/items`,
          label: t('items'),
          icon: <PendingActionsIcon color='info' />,
        },
        {
          navigateTo: `/checklist/${selectedId}/active/eforms`,
          label: 'Eforms',
          icon: <ListAltIcon color='info' />,
        },
      ]
    : [];
  return (
    <DashboardLayout>
      <Card sx={{ mt: 2.5 }}>
        <GoBack back={onNavigateBack} />
      </Card>

      <Card sx={{ mt: 1, padding: 2 }}>
        <Typography variant='h1'>{title}</Typography>
      </Card>

      <Card sx={{ mt: 1, mb: 1, padding: 1 }}>
        <DetailsMenuBar items={items} />
      </Card>

      <Card sx={{ mt: 1, mb: 1 }}>
        <Outlet context={[id, details, { type: 'checklists' }]} />
        {loading && <Loader />}
      </Card>
    </DashboardLayout>
  );
};
