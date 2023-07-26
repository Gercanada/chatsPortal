import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SaveIcon from '@mui/icons-material/Save';

const EditModal = ({ response }) => {
  const [html, setHtml] = useState('');
  return (
    <div>
  

      <Button
        sx={{
          flex: '1 1 auto',
          minWidth: '100px',
          marginTop: '10px',
          textAlign: 'center',
        }}
        color='primary'
        size='large'
      >
        <CloudDownloadIcon />
        <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Download file</Typography>
      </Button>
      <Button
        sx={{
          flex: '1 1 auto',
          minWidth: '100px',
          marginTop: '10px',
          textAlign: 'center',
        }}
        color='primary'
        size='large'
      >
        <SaveIcon />
        <Typography sx={{ color: '#fff', paddingLeft: '10px' }}>Save as document</Typography>
      </Button>
    </div>
  );
};

export default EditModal;
