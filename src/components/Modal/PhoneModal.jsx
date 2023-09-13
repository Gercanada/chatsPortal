import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputLabel,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';
import { sendMessage } from '../../store/slices/whatsApp/thunks';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './modalStyle.css';

const PhoneModal = ({ open, onClose, title, number }) => {
  const dispatch = useDispatch();
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
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [numberPhone, setNumberPhone] = useState('');
  const [extensionNumber, setExtensionNumber] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleExtensionNumber = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 3) {
      setExtensionNumber(value);
    }
  };

  const handleNumberPhone = (event) => {
    const value = event.target.value;
    console.log('value phone', value);
    if (/^\d*$/.test(value) && value.length === 10) {
      console.log('aqui phone');
      setIsDisabled(false);
      setNumberPhone(value);
    } else {
      setIsDisabled(true);
    }
  };

  const handleMessage = (event) => {
    const value = event.target.value;
    setMessageBody(value);
  };

  const handleOnClick = async () => {
    const formData = {
      recipient: number ? number + numberPhone : extensionNumber + numberPhone,
      body: messageBody,
    };
    console.log('form', formData);
    const resp = await dispatch(sendMessage(formData.recipient, formData.body));
    if (resp === 200) {
      toast.success(t('sent'));
      handleClose();
    } else {
      toast.error(t('error'));
    }
  };

  const handleClose = () => {
    setNumberPhone('');
    setMessageBody('');
    setExtensionNumber('');
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
      <Grid className={'modal-container'}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
          >
            <Typography variant='h4'>{title}</Typography>
          </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Typography sx={{ m: 1, pt: 2.5 }}>+</Typography>
          <TextField
            sx={{ width: '80px', m: 1 }}
            placeholder={'Ext...'}
            type={'phone'}
            name={'extension'}
            defaultValue={extensionNumber}
            inputProps={{ maxLength: 3 }}
            onChange={(e) => {
              setValue('extension', e.target.value);
              handleExtensionNumber(e);
            }}
          />
          <TextField
            onChange={(e) => {
              setValue('recipient', e.target.value);
              handleNumberPhone(e);
            }}
            placeholder={t('phone')}
            sx={{ m: 1 }}
            name={'recipient'}
            defaultValue={number ? number : numberPhone}
            type={'phone'}
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {/* <Typography sx={{ m: 1 }}>{t('message')}</Typography> */}
          <TextareaAutosize
            minRows={3}
            onChange={(e) => {
              setValue('body', e.target.value);
              handleMessage(e);
            }}
            sx={{ m: 2 }}
            name='body'
            placeholder={t('type_message')}
            color='primary'
          />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
          <Button
            type='submit'
            onClick={handleOnClick}
            size='large'
            sx={{ margin: '10px', width: '30%' }}
            color='primary'
            disabled={number ? false : isDisabled}
          >
            {t('send')}
          </Button>
          <Button
            type='button'
            size='large'
            sx={{ margin: '10px', width: '30%' }}
            color='primary'
            onClick={() => {
              handleClose(), setNumberPhone('');
              setMessageBody('');
              setExtensionNumber('');
            }}
          >
            {t('cancel')}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default PhoneModal;
