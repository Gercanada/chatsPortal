import { Button, Card, Grid, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TranslatableTable from '../../../../../components/TranslatableTable';
import { useTranslation } from 'react-i18next';

export const CasePaymentsDetails = () => {
  const navigate = useNavigate();

  const [id] = useOutletContext();
  const { t } = useTranslation();

  return (

    <>
    
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{marginTop: '10px'}}>
        {/* <Button
          sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
          size='large'
          color='primary'
          onClick={(event) => {
            navigate(`/admin/payments/create`);
          }}
        >
          <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
            {t('submenu_payments')}
          </Typography>
          <NoteAddIcon color='iconw'></NoteAddIcon>
        </Button> */}

        </Card>
      </Grid>

      <Grid item xs={12}>
        <TranslatableTable
          path={`/resource/tickets/${id}/payments`}
          title={t('submenu_payments')}
          group='/immigration/payments'
          prefix='tickets.'
          columns={[
            'id',
            'subject',
            'payment_no',
            'payment_date',
            'amount',
            'description',
            'client_id',
            'ticket_id',
          ]}
        />
      </Grid>
    </Grid>
    </>
  );
};
