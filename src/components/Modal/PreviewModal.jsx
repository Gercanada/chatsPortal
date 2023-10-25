import {
    Box,
    Modal,
  } from '@mui/material';
  import React from 'react';
  
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
    width: '300px',  // Ancho fijo de 300 píxeles
    height: '300px', // Alto fijo de 300 píxeles
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
  };
  
  const PreviewModal = ({
    open,
    onClose,
    attachmentFile,
  }) => {
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
          {attachmentFile && (
            <img src={URL.createObjectURL(attachmentFile)} style={imgStyle} alt="Preview" />
          )}
        </Box>
      </Modal>
    );
  };
  
  export default PreviewModal;
  