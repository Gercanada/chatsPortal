import { Button, Card, Grid, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { useTranslation } from 'react-i18next';
import MiniTable from '../../../../../components/MiniTable';
import GridTable from '../../../../../../components/Tables/GridTable';

export const CaseChecklists = (params) => {
  const [id] = useOutletContext([0]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12}>
        <Card>
        <Button
          sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
          size='large'
          color='primary'
          onClick={(event) => {
            navigate(`/immigration/checklists/create?case=1`);
          }}
        >
          <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
            {t('create_checklists')}
          </Typography>
          <NoteAddIcon color='iconw'></NoteAddIcon>
        </Button>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{marginBottom: '10px'}}>
        <Card>
        <GridTable
      path={`/resource/tickets/${id}/checklists`}
     id={id}
     title={t('submenu_checklists')}
    //  prefix={'profilesContactsDetails'}
           columns={[
              { field: 'id',headerName:'ID', width: 100, align: 'center',sortable: false },
              {
                field: 'type_id',
                headerName: t('type_id'),
                sortable: false,
                width: 210,
                // renderCell: (params) => (
                //   <Link to={`/immigration/cases/${params.id}`}>{params.value}</Link>
                // ),
                align: 'center',
              },
              {
                field: 'completed_items_count',
                headerName: t('completed_items_count'),
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
