import { Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const NotFoundPage = () => {
  return (
    <DashboardLayout>
      <Grid container>
        <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} item xs={12}>
          <img src='../../../public/images/notfound2.png' width='220px' alt='' />
        </Grid>
      </Grid>
      <Grid container>
        <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} item xs={12}>
          <Typography sx={{fontSize: '60px', color: '#FFC300'}} variant='h1'>Ups</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
          <Typography sx={{fontSize: '90px'}} variant='h1'>ERROR 404</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sx={{ display: 'flex', justifyContent: 'center',  }} item xs={12}>
          <Typography sx={{fontSize: '50px'}} variant='h1'>Not Found</Typography>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
