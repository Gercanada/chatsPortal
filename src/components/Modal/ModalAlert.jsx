import { Box, Button, ButtonGroup, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';

export const ModalAlert = ({onSubmit, open, onClose, title }) => {
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
  const handleClose = () => onClose(false);
  return (
    <Grid container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
            <HelpOutlineIcon sx={{fontSize: 100}} color='error' />
          </Grid>
          <Grid item sx={{marginBottom: '20px', display: 'flex', justifyContent: 'center' }} xs={12}>
            <Typography variant='h1' id='modal-modal-title' component='h2'>
            {t('are_you_sure')}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item>
            <ButtonGroup >
              <Button onClick={handleClose} size='large' color='error' variant='outlined'>
                No
              </Button>
              <Button onClick={onSubmit} size='large' color='success' variant='outlined'>
                Si
              </Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </Modal>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
    </Grid>
  );
};
