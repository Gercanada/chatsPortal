import { Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import PopoverField from '../../../../components/Popovers/PopoverField';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './chatsStyles.css';

const BoxMessage = ({ isResponse, type, messageContainer }) => {
  const { value, at, readers,reaction,read } = messageContainer;


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
  return (
    <>
      <Paper
        elevation={0}
        style={isResponse ? bubbleStyleResponse : bubbleStyleRequest }
        sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}
      >
        <TextField
          className={isResponse ? 'textField2' : 'textField' }
          value={value}
          multiline
          disabled={isResponse ? false : true }
          variant='standard'
          InputProps={{
            disableUnderline: true,
            readOnly: true,
          }}
        />

        <Grid sx={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}>
         {isResponse ? <PopoverField values={readers} title={'readers'} type={'users'} /> :
            reaction
         }
          <Typography sx={{ textAlign: 'end', mr: 1 }}>{at}</Typography>
    { isResponse === false && <DoneAllIcon
            sx={{ textAlign: 'end', mr: 1 }}
            color={read === 'read' ? 'primary' : 'black'}
            />}
        </Grid>
      </Paper>
    </> 
  );
};

export default BoxMessage;
