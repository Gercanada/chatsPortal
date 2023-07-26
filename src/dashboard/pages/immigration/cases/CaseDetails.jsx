import { Button, Card, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../components/Loader';
import { useFetchApi } from '../../../hooks';
import { DetailsMenuBar } from './components';
import GoBack from '../../../../components/Navigation/GoBack';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useEffect, useState } from 'react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getCounterInfo } from '../../../../store/slices/navbar';
import { getChecklistByIdDetails } from '../../../../store/slices/checklists';
import GridTable from '../../../../components/Tables/GridTable';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const CaseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [ids, setId] = useState('');
  const onNavigateBack = () => {
    navigate('/checklist');
  };

  const { checklistForDetails, loading } = useSelector((state) => state.checklists);
  const details = checklistForDetails;
  const title = details?.subject || '';
  const applicantName = details?.applicant_full_name || '';
  const idToCase = details?.case?.id || '';
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
      <Card 
       sx={loading ? { display: 'none' } :{
          mt: 1, padding: 2 
        }}
        >
        <Typography variant='h1'>
          <IconButton onClick={onNavigateBack}>
            <KeyboardBackspaceIcon fontSize='large' />
          </IconButton>
          {title}
        </Typography>
        <Typography variant='h6'>{t('applicant_full_name')}: {applicantName}</Typography>
        <Typography variant='h6'>
          {t('case')}:{' '}
          <Link
            style={{ color: isLightTheme === false ? 'white' : '' }}
            to={`/cases/${idToCase}/active/pendingcases`}
          >
            {t('to_case')}
          </Link>
        </Typography>
      </Card>

      <Card
           sx={loading ? { display: 'none' } :{
            mt: 1, mb: 1, padding: 1 
        }}>
        <DetailsMenuBar items={items} />
      </Card>

      <Card
           sx={loading ? { display: 'none' } :{
            mt: 1, mb: 1 
        }}>
        <Outlet context={[id, details, { type: 'checklists' }]} />
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
