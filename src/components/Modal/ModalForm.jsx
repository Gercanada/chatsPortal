import { Box, Button, Card, Grid, Input, InputLabel, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';

// format for dataForm
// export const details =[
//   {name_:"Nombre",key:"name",allowEdit: false, type:'text',fetch_to: "resource/clients"},
//   {name_:"Apellido",key:"last_name",allowEdit: false, type:'text',fetch_to: "resource/clients"},
//   {name_:"Email",key:"email",allowEdit: false,type:"text",fetch_to: "resource/clients"},
//   {name_:"Telefono movil",key:"mobile_phone",allowEdit: false,type:'number',fetch_to:"resource/clients"},
// ];

const ModalForm = ({ open, onClose, dataForm, title, selectValues, onSubmit,toScreen,toFullAvaliable, isPassword}) => {
  const { control, handleSubmit, register,  formState: { errors }, onInputChange } = useForm({
    defaultValues: {},
  });
  const { t } = useTranslation();

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width : '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

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
          <Grid container >
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
            >
              <Typography variant='h4'>{title}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ display: 'flex', justifyContent: isPassword ? 'center' : '' }}>
            {dataForm?.map((item,index) =>
              item?.type === 'date' ? (
                <Grid item xs={12} md={5.8} sx={{ marginTop: '8px', marginLeft: '5px' }} key={index} >
                  <InputLabel >
                    {item?.name_}
                    <span className='text-danger'> * </span>
                  </InputLabel>
                  <Controller
                    name={item?.key}
                    control={control}
                    render={({ field: fieldDatePicker }, ref) => (
                      <CDatePicker {...fieldDatePicker} inputRef={ref} />
                    )}
                  />
                </Grid>
              ) : item.type === 'select' ? (
                <Grid item xs={12} md={5.8} sx={{ marginTop: '8px', marginLeft: '5px' }}  key={index}>
                  <InputLabel>
                    {item.name_}
                    <span className='text-danger'> * </span>
                  </InputLabel>
                  <Controller
                    name={item.key}
                    control={control}
                    render={({ field: fieldSelect }) => (
                      <StyledReactSelect {...fieldSelect} options={
                      item.key === 'client_id'
                      ? selectValues[0]
                      :item.key === 'category_id'
                      ?selectValues[1]
                      :item.key === 'status_id'
                      ?selectValues[2]
                      :item.key === 'type_id'
                      ? selectValues[0]
                      :item.key === 'ticket_id'
                      ?selectValues[1]
                      :item.key === 'assigned_to'
                      ?selectValues[2]
                      :selectValues} />
                    )}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} md={5.8} sx={{ margin: '5px' }}  key={index}>
                  <DInput errors={errors} onInputChange={onInputChange} control={control} register={register} data={item} />
                </Grid>
              ),
            )}
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center'}} item xs={12} >
          {toFullAvaliable && 
          <CButton
          title={t('change_password')}
              type='button'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
              onClick={toScreen}
            >
              {t('go_to_full_screen')}
            </CButton>
          }
            <CButton
              type='submit'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
            >
              {t('save')}
            </CButton>
            <CButton
              type='button'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
              onClick={handleClose}
            >
              {t('cancel')}
            </CButton>
          </Grid>


        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
