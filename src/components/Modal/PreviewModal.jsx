import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';

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
  width: '70%', // Ancho fijo de 300 píxeles
  height: '60%', // Alto fijo de 300 píxeles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const PreviewModal = ({ open, onClose, attachmentFile }) => {
  const [numPages, setNumPages] = useState(null);

  const handleClose = () => {
    onClose(false);
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
      </Box>
    </Modal>
  );
};

export default PreviewModal;
