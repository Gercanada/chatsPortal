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

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const ImageModal = ({ open, onClose, imageUrl, title, onSubmit, toScreen }) => {
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
  // const style = {
  //   position: 'relative',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: '50%',
  //   bgcolor: 'background.paper',
  //   border: '1px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  //   overFlowY: 'visible',
  // };
  const contentStyle = {
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '4px',
    padding: '20px',
    width: '60%', // Ancho fijo de 300 píxeles
    height: '60%', // Alto fijo de 300 píxeles
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:'column'
  };

  const setDefaultValues = async () => {};

  const handleClose = () => {
    onClose(false);
  };

  const handleDownloadImage = () => {
    // Construct the full image URL
    const imageUrlFull = `https://chat.immcase.com/${imageUrl}`;

    // Create an anchor element for download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrlFull;
    downloadLink.download = 'image.jpg'; // You can customize the file name here
    downloadLink.target = '_blank';

    // Programmatically click the download link
    downloadLink.click();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={modalStyle}
      //  sx={{ overFlowY: 'visible' }}
    >
      <Box sx={contentStyle}>
        <img
          alt='Preview'
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: '90%',
            height: '60%',
          }}
          src={`https://chat.immcase.com/${imageUrl}`}
          className='image'
        />

        <Grid sx={{ display: 'flex', justifyContent: 'center' }} item>
          <Button onClick={handleDownloadImage} size='large' className={'buttons'} color='primary'>
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
      </Box>
    </Modal>
  );
};

export default ImageModal;
