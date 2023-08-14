import { Box, Button, Card, Grid, Input, InputLabel, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';

const NewFormModal = ({
  open,
  onClose,
  dataForm,
  title,
  //selectValues,
  selectValues,
  onSubmit,
  toScreen,
  isEdit,
  data,
}) => {
  console.log("datukiiii",data)
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
          <Grid container sx={{ display: 'flex' }}>
            {dataForm?.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'date' ? (
                  <Grid
                    item
                    xs={12}
                    md={5.8}
                    sx={{ marginTop: '8px', marginLeft: '5px' }}
                    key={index}
                  >
                    <InputLabel>
                      {t(item.key)}
                      <span className='text-danger'> * </span>
                    </InputLabel>
                    <Controller
                      name={item.key}
                      control={control}
                      render={({ field: fieldDatePicker }, ref) => (
                        <CDatePicker {...fieldDatePicker} inputRef={ref} isRequired={true} />
                      )}
                    />
                  </Grid>
                ) : item.type === 'select' ? (
                  selectValues && (
                    <Grid
                      item
                      xs={12}
                      md={5.8}
                      sx={{ marginTop: '8px', marginLeft: '5px' }}
                      key={index}
                    >
                      <InputLabel>
                        {t(item.key)}
                        <span className='text-danger'> * </span>
                      </InputLabel>
                      <Controller
                        name={item.key}
                        control={control}
                        defaultValue={
                          isEdit
                            ? { value: item?.value?.id, label: item?.value?.value }
                            : t('select')
                        }
                        render={({ field: fieldSelect }) => (
                          <StyledReactSelect
                            {...fieldSelect}
                            options={selectValues
                              ?.get(item.key)
                              .map((optionSelect) => optionSelect)}
                          />
                        )}
                      />
                    </Grid>
                  )
                ) : (
                  <Grid
                    item
                    xs={12}
                    md={5.8}
                    sx={{ marginTop: '8px', marginLeft: '5px' }}
                    key={index}
                  >
                    <DInput register={register} data={item} />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
            {toScreen && (
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
            )}
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

export default NewFormModal;
