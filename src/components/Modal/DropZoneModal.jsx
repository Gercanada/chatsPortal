import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Input, ListItem, Modal, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CButton from '../Button/CButton';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const DropZoneModal = ({ open, onClose, title, service, id }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { t } = useTranslation();
  const [file, setFiles] = useState();
  const dispatch = useDispatch();
  const { control, handleSubmit, register } = useForm({
    defaultValues: {},
  });
  const handleClose = () => onClose(false);

  const files = acceptedFiles.map((file, index) => (
    <ul key={index}>
      <li key={file.path}>
        {file.path}
      </li>
    </ul>
  ));

  const handleFile = async() => {
    const formData = {
      file: acceptedFiles,
    };
    if (acceptedFiles.length > 0) {
      const resp = await dispatch(service(formData, id));
      if (resp) {
        onClose(false);
      }
    } else {
      toast.error('Error!');
    }
  };

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ overFlowY: 'visible' }}
      >
        <Box sx={style}>
          
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
              <Grid
                item
                sx={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Grid sx={{ margin: 'auto', height: '100px' }}>
                  <Box
                    sx={{
                      height: '100%',
                      border: '3px dashed #eeeeee',
                      background: '#fafafa',
                      color: '#bdbdbd',
                    }}
                    {...getRootProps()}
                  >
                    <Input {...getInputProps()} />
                    <Typography sx={{ textAlign: 'center', paddingTop: '10%' }}>
                      {t('drag_and_drop_files_here')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid sx={{ marginLeft: '20%' }} item>
                  <Typography>{t('files')}:</Typography>
                  <ListItem>{files}</ListItem>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
              <CButton
                type='submit'
                size='large'
                sx={{ margin: '10px', width: '30%' }}
                color='primary'
                onClick={handleFile}
              >
                {t('save')}
              </CButton>
              <CButton
                type='button'
                size='large'
                sx={{ margin: '10px', width: '30%' }}
                color='primary'
                onClick={() => {
                  onClose(false), setFiles('');
                }}
              >
                {t('cancel')}
              </CButton>
            </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DropZoneModal;
