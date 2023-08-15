import { Card, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useEffect, useState } from 'react';
import { getUserChat, sendMessage } from '../../../../store/slices/whatsApp/thunks';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
//import io from 'socket.io-client'

//const socket =io("/")


const MessagesField = ({ setNewMessage,setMessage,id }) => {
  const [valueMessage, setValueMessage] = useState('');
  const [hasMessage, setHasMessage] = useState(true);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleOnchange = (e) => {
    const textValue = e.target.value;
    if(!textValue){
      setHasMessage(true)
      setValueMessage(textValue);
    }else{
    setHasMessage(false)
    setValueMessage(textValue);
    setMessage(textValue)
    }
  };

  const handleSendMessage = async() => {
    setValueMessage(''); 
    const resp = await dispatch(sendMessage(id,valueMessage))
    if(resp===200){
     dispatch(getUserChat(id))
     toast.success(t('sent'));
    }
   }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newMessage = valueMessage;
    setMessage(newMessage)
    // const newMessage = {
    //   id: Math.random(),
    //   message_type: 'request',
    //   message: valueMessage, // Usa el valor de valueMessage en lugar de 'valueMessage'
    //   avatar: null,
    //   username: 'josue_r',
    //   name: 'Josue',
    //   last_name: 'Rocha',
    //   email: 'josue.r@gercanada.com',
    // };

    // setNewMessage((prevState) => ({
    //   ...prevState,
    //   data: [...prevState.data, newMessage],
    // }));
    // // socket.emit('message',newMessage)
    // 
    setValueMessage(''); 
  };
  // useEffect(()=>{
  //   socket.on('message',messages=>{
  //     setNewMessage((prevState) => ({
  //       ...prevState,
  //       data: [...prevState.data, messages],
  //     }));
  //   })
  //   return () =>{
  //     socket.off('messagge')
  //   }
  // },[])

  return (
    <Grid>
      <Card sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <IconButton aria-label='delete' size='large' disabled>
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
          onClick={handleSendMessage}
          aria-label='delete'
          size='large'
          color='success'
          type='submit'
        >
          <SendIcon />
        </IconButton>
      </Card>
    </Grid>
  );
};

export default MessagesField;
