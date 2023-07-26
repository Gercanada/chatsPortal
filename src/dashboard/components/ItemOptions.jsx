import { EditOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { deleteRecord } from '../../store/slices/form/thunks';
import { useTranslation } from 'react-i18next';
import MailIcon from '@mui/icons-material/Mail';
import { ModalAlert } from '../../components/Modal/ModalAlert';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

export const ItemOptions = ({ path, id, resource, handleOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const navigateTo = (url) => {
    navigate(url);
  };

  const onSubmitModal = async () => {
 
    const res = await dispatch(deleteRecord(resource, id));
   
    if (res.status === 200 || res.status === 201) {
 
      // TODO Agregar path de eliminacion para cada modulo
      setOpenModal(false);
      navigate('/immigration/cases'); 
    }
  };

  return (
    <Grid container>
      <ModalAlert
        onSubmit={onSubmitModal}
        open={openModal}
        onClose={setOpenModal}
        title={t('delete')}
      />

      <ButtonGroup
        variant='contained'
        sx={{
          height: '50px',
          marginRight: '10px',
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          boxShadow: 'none',
        }}
      >
        <Button color='primary' style={{ display: 'flex', marginTop: '10px' }} onClick={handleOpen}>
          <PictureAsPdfIcon />
          <Typography sx={{ color: '#fff', display: 'flex', marginLeft: '10px' }}>{t('export_to_pdf')}</Typography>
        </Button>
        <Button color='primary' style={{ marginTop: '10px' }} onClick={handleOpen}>
            <AttachEmailIcon />
          <Typography sx={{marginLeft: '10px', color: '#fff' }}>
            {t('send_email')}
          </Typography>
        </Button>

        <Button
          color='primary'
          size='large'
          style={{ marginTop: '10px' }}
          onClick={() => {
            navigateTo(`${path}/${id}/edit`);
          }}
        >
            <EditOutlined />
          <Typography sx={{marginLeft: '10px', color: '#fff' }}>
            {t('edit')}
          </Typography>
        </Button>

        <Button
          color='primary'
          size='large'
          style={{ marginTop: '10px' }}
          onClick={(event) => {
            setOpenModal(true);
          }}
        >
          <DeleteForeverIcon />
          <Typography sx={{marginLeft: '10px', color: '#fff' }} >{t('delete')}</Typography>
        </Button>
      </ButtonGroup>
    </Grid>
  );
};
