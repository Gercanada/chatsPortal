import { Box, Grid, Modal, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';


const ProgressModal = ({ open, loading }) => {

  const { t } = useTranslation();

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

  return (
    <>
    {loading && 
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overFlowY: 'visible' }}
    >
      <Box sx={style}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Grid item>
           <CircularProgress sx={{ textAlign: 'center' }} />
            <Typography>{t('wait_seconds')}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    } 
    </>
  );
};
export default ProgressModal;
