import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendFiles } from '../../store/slices/whatsApp/thunks';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  backgroundColor: 'white',
  border: '2px solid #000',
  borderRadius: '4px',
  padding: '20px',
  width: '50%', // Ancho fijo de 300 píxeles
  height: '60%', // Alto fijo de 300 píxeles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const PreviewModal = ({ open, onClose, attachmentFile }) => {
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(null);
  const { id, thread } = useParams();
  const handleClose = () => {
    onClose(false);
  };

  const handleSendMessages = async () => {
    const response = await dispatch(sendFiles(id, attachmentFile));
    if (response !== 200) {
      toast.error('error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={modalStyle}
    >
      <Box sx={contentStyle}>
        {attachmentFile &&
          (attachmentFile.type.startsWith('image/') ? ( // Comprueba si es una imagen
            <img
              src={URL.createObjectURL(attachmentFile)}
              alt='Preview'
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
              }}
            />
          ) : attachmentFile.type === 'application/pdf' ? ( // Comprueba si es un PDF
            <img
              src={'../../../public/images/file.svg'}
              alt='Preview'
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
              }}
            />
          ) : (
            <p>Formato de archivo no compatible.</p>
          ))}
        <Button type='submit' color='primary' onClick={handleSendMessages}>
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default PreviewModal;
