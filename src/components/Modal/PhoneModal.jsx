import { Box, Button, Card, Grid, Input, InputLabel, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';

const PhoneModal = ({
  open,
  onClose,
  title,
  onSubmit,
  setNumberPhone,
  setExtensionNumber,
  data,
}) => {
  console.log('datukiiii', data);
  const {
    control,
    formState: { errors },
    setValue,
    onInputChange,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {},
  });
  const { t } = useTranslation();
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };
  const handleExtensionNumber =(event)=>{
    const value = event.target.value
    setExtensionNumber(value)
  }

  const handleNumberPhone =(event)=>{
    const value = event.target.value
    setNumberPhone(value)
  }

  const handleClose = () => onClose(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overFlowY: 'visible' }}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
            >
              <Typography variant='h4'>{title}</Typography>
            </Grid>
          </Grid>
          <Grid sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Typography sx={{m:1}}>+</Typography>
            <TextField onChange={handleExtensionNumber} sx={{width:'80px',m:1}}  type={'number'}/>
            <TextField onChange={handleNumberPhone} sx={{m:1}} type={'number'}/>
          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
            <Button
              type='submit'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
            >
              {t('save')}
            </Button>

            <Button
              type='button'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default PhoneModal;
