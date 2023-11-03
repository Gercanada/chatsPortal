import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PopoverField from '../../../../components/Popovers/PopoverField';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './chatsStyles.css';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const BoxMessage = ({ isResponse, type, messageContainer }) => {
  const { value, at, readers, reaction, read, creator, typeMessage, mediaUrl } = messageContainer;
  const [documentName, setDocumentName] = useState('');
  const bubbleStyleRequest = {
    padding: '8px 16px',
    marginBottom: '8px',
    maxWidth: '70%',
    backgroundColor: '#005c4b',
    borderRadius: '10px',
  };
  const bubbleStyleResponse = {
    padding: '8px 16px',
    marginBottom: '8px',
    maxWidth: '70%',
    borderRadius: '10px',
  };
  useEffect(() => {
    if (typeMessage === 'document' ) {
      const url = value;
      const parts = url.split('/');
      const nombreDocumento = parts[parts.length - 1];
      setDocumentName(nombreDocumento);
    }
  }, []);

  return (
    <>
      <Paper
        elevation={0}
        style={isResponse ? bubbleStyleResponse : bubbleStyleRequest}
        sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}
      >
        {isResponse === false && (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ width: '100%', color: '#40a3c3' }}>{creator}</Typography>
          </Grid>
        )}
        {typeMessage === 'document' ? (
          <Grid sx={{ display: 'flex', justifyContent:'space-between' }}>
          <Grid>
              <PictureAsPdfRoundedIcon
                sx={{ textAlign: 'end', mr: 1, fontSize:'30px' }}
                color={'error'}
              />
            <Typography sx={isResponse === false ?{ color: 'white' }:{ color: 'grey' }} variant='p'>
              {documentName}
            </Typography>
            </Grid>
            <Grid>
            <a href={value} target='_blank' download>
              <DownloadRoundedIcon
                sx={{ textAlign: 'end', mr: 1,fontSize:'30px' }}
                color={'black'}
              />
            </a>
            </Grid>
          </Grid>
        ) : (
          <TextField
            className={isResponse ? 'textField2' : 'textField'}
            value={value}
            multiline
            disabled={isResponse ? false : true}
            variant='standard'
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          />
        )}
        <Grid
          sx={
            isResponse
              ? { textAlign: 'end', display: 'flex', justifyContent: 'space-between' }
              : { textAlign: 'end', display: 'flex', justifyContent: 'end' }
          }
        >
          {isResponse ? (
            <PopoverField values={readers} title={'readers'} type={'users'} />
          ) : (
            reaction
          )}
          <Typography
            sx={
              isResponse ? { textAlign: 'end', mr: 1 } : { textAlign: 'end', mr: 1, color: 'white' }
            }
          >
          {at}
          </Typography>
          {isResponse === false && (
            <DoneAllIcon
              sx={{ textAlign: 'end', mr: 1 }}
              color={read === 'read' ? 'primary' : 'info'}
            />
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default BoxMessage;
