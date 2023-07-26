import { Button, Card, Typography } from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../components/Loader';
import { DetailsMenuBar } from './components';
import GoBack from '../../../../components/Navigation/GoBack';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ExportModal } from '../../../components/ExportModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCasesByIdDetails } from '../../../../store/slices/cases/thunks';
import ListAltIcon from '@mui/icons-material/ListAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';

export const CaseDetails2 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onNavigateBack = () => {
    navigate('/cases');
  };
  const { id } = useParams();

  const dispatch = useDispatch();
  const { casesForDetails, loading } = useSelector((state) => state.cases);

  const details = casesForDetails;
  const title = details?.title || '';
  const type = details?.type || '';
  const noApplicants = details?.no_of_applicants || '';
  const status = details?.status || '';

  const selectedId = id;

  const getShowData = async () => {
    if (id) await dispatch(getCasesByIdDetails(id));
  };

  useEffect(() => {
    getShowData();
  }, [id]);

  const items = details
    ? [
        {
          navigateTo: `/cases/${selectedId}/active/completedcases`,
          label: t('complete_checklist'),
          icon: <ListAltIcon color='info' />,
        },
        {
          navigateTo: `/cases/${selectedId}/active/pendingcases`,
          label: t('active_checklist'),
          icon: <PlaylistAddCheckIcon color='info' />,
        },
      ]
    : [];

  return (
    <DashboardLayout>
      <Card sx={{ mt: 2, padding: 2 }}>
        <Typography variant='h1'>
          <IconButton onClick={onNavigateBack}>
            <KeyboardBackspaceIcon fontSize='large' />
          </IconButton>
          {title}
        </Typography>
        <Typography variant='h6'>{t('checklist_type')}: {type}</Typography>
        <Typography variant='h6'>{t('num_of_applicants')}: {noApplicants}</Typography>
        <Typography variant='h6'>{t('status')}: {status}</Typography>
      </Card>

      <Card sx={{ mt: 1, mb: 1, padding: 1 }}>
        <DetailsMenuBar items={items} />
      </Card>

      <Card sx={{ mt: 1, mb: 1 }}>
        <Outlet context={[id, details, { type: 'case' }]} />
        {loading && <Loader />}
      </Card>
    </DashboardLayout>
  );
};
