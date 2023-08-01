import { Card, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useState } from 'react';

const MessagesField = ({ setNewMessage,messages }) => {
  const [valueMessage, setValueMessage] = useState('');
  const [hasMessage, setHasMessage] = useState(true);

  const handleOnchange = (e) => {
    const textValue = e.target.value;
    if(!textValue){
      setHasMessage(true)
    }else{
      setHasMessage(false)
    setValueMessage(textValue);
    }
  };
  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newMessage = {
      id: Math.random(),
      message_type: 'request',
      message: valueMessage, // Usa el valor de valueMessage en lugar de 'valueMessage'
      avatar: null,
      username: 'josue_r',
      name: 'Josue',
      last_name: 'Rocha',
      email: 'josue.r@gercanada.com',
    };

    // Usa el spread operator para copiar los mensajes existentes y agregar el nuevo mensaje
    setNewMessage((prevState) => ({
      ...prevState,
      data: [...prevState.data, newMessage],
    }));
    setValueMessage(''); 
  };

  return (
    <Grid>
    <form noValidate onSubmit={handleOnSubmit}>
      <Card sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <IconButton aria-label='delete' size='large'>
          <AttachFileIcon />
        </IconButton>
        <TextField
          onChange={() => {
            handleOnchange(event);
          }}
          value={valueMessage}
          sx={{ m: 1, width: '80%' }}
          variant='outlined'
        />
        <IconButton
          disabled={hasMessage}
          aria-label='delete'
          size='large'
          color='success'
          type='submit'
        >
          <SendIcon />
        </IconButton>
      </Card>
      </form>
    </Grid>
  );
};

export default MessagesField;
