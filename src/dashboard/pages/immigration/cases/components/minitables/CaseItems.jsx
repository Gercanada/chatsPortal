import { useOutletContext, useNavigate } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { Button, Grid, Typography } from '@mui/material';
import MiniTable from '../../../../../components/MiniTable';
import { useTranslation } from 'react-i18next';
import GridTable from '../../../../../../components/Tables/GridTable';

export const CaseItems = () => {
  const [id] = useOutletContext([0]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          sx={{ marginTop: '10px', marginBottom: '40px', float: 'right' }}
          size='large'
          color='primary'
          onClick={(event) => {
            navigate(`/immigration/items/create`);
          }}
        >
          <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
            New CL item6+54654654
          </Typography>
          <NoteAddIcon color='iconw'></NoteAddIcon>
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* <MiniTable
          path={'/resource/tickets/' + id + '/items'}
          title={t('submenu_items')}
          group='/immigration/items'
          prefix='tickets.'
          columns={[
            'subject',
            'status_id',
            // No tiene columna de Category aun
          ]}
        /> */}
        <Card>
        <GridTable
      path={`/resource/tickets/${id}/items`}
     id={id}
     title={t('submenu_items')}
    //  prefix={'profilesContactsDetails'}
           columns={[
              { field: 'id',headerName:'ID', width: 100, align: 'center',sortable: false },
              {
                field: 'subject',
                headerName: t('subject'),
                sortable: false,
                width: 210,
                // renderCell: (params) => (
                //   <Link to={`/immigration/cases/${params.id}`}>{params.value}</Link>
                // ),
                align: 'center',
              },
              {
                field: 'status_id',
                headerName: t('status_id'),
                width: 210,
                align: 'center',
                sortable: false,
              },
              
            ]}
          />

        </Card>
        
      </Grid>
    </Grid>
  );
};
