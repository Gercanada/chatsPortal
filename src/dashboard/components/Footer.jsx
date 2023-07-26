import { BottomNavigation, Grid, Typography } from '@mui/material';
import '../../../src/footer.css';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const date = new Date().getFullYear();
  return (
    <>
      {/* <footer>
                <div style={{ position: 'sticky', marginBottom: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#000' }}> Footer
                </div>
            </footer> */}

      {/* <Grid
        className='footer'
        item
        container
        sx={{
          backgroundColor: '#2f2f2f',
          paddingTop: '50px',
          paddingBottom: '50px',
          paddingX: '15%',
        }}
      >
        <Grid
          xs={12}
          sx={{
            display: 'flex',

            justifyContent: 'center',
          }}
        >
          <Grid xs={3}>
            <button>Contact us</button>
          </Grid>
          <Grid xs={3}>
            <button>Contact us</button>
          </Grid>
          <Grid xs={3}>
            <button>Contact us</button>
          </Grid>
          <Grid xs={3}>
            <button>Contact us</button>
          </Grid>
        </Grid>
      </Grid> */}
      <footer>
        <div className='footer'>
          {/*
         commented out because no links yet
           <div className='row'>
            <ul>
              <li>
                <a href='#'>Contact us</a>
              </li>
              <li>
                <a href='#'>Our Services</a>
              </li>
              <li>
                <a href='#'>Privacy Policy</a>
              </li>
              <li>
                <a href='#'>Terms & Conditions</a>
              </li>
            </ul>
          </div> */}
          <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
          ImmVisas Copyright © {date} {t('all_rights_reserved')}
          </div>
        </div>
      </footer>
    </>
  );
};
