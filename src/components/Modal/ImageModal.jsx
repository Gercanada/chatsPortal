import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';
import './modalImageStyle.css';

const ImageModal = ({
    open, onClose, imageUrl, title, onSubmit,toScreen
}) => {
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
  const [fieldsValues, setFieldsValues] = useState([]);
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

  const setDefaultValues = async () => {};

  const handleClose = () => {
    onClose(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overFlowY: 'visible' }}
    >
      <div sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid  className={'image-container'}>
            <img src={`https://chat.immcase.com/${imageUrl}`} className='image'  alt='' />
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
            <Button type='submit' size='large' className={'buttons'} color='primary'>
              {t('download')}
            </Button>
            <Button
              type='button'
              size='large'
              className={'buttons'}
              color='primary'
              onClick={handleClose}
            >
              X
            </Button>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default ImageModal;
