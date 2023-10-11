import { Card, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useEffect, useState } from 'react';
import { getUserChat, getUserFiles, sendMessage } from '../../../../store/slices/whatsApp/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PopoverField from '../../../../components/Popovers/PopoverField';
//import io from 'socket.io-client'

//const socket =io("/")

const MessagesField = ({ setHasChange, loadChats,setNewMessage }) => {
  const [valueMessage, setValueMessage] = useState('');
  const { id, thread, prefix } = useParams();
  const [hasMessage, setHasMessage] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { userFiles } = useSelector((state) => state.whatsApp);

  useEffect(() => {
    dispatch(getUserFiles(thread));
  }, [id]);

  const handleOnchange = (e) => {
    const textValue = e.target.value;
    if (!textValue) {
      setHasMessage(true);
      setValueMessage(textValue);
      setNewMessage(textValue)
    } else {
      setHasMessage(false);
      setValueMessage(textValue);

    }
  };

  const handleSendMessage = async () => {
    setValueMessage('');
    setHasChange(true)
    const resp = await dispatch(sendMessage(id, valueMessage));
    if (resp === 200) {
      loadChats()
      dispatch(getUserChat(id));
      toast.success(t('sent'));
    }
  };



  return (
    <Grid>
      <Card sx={{ justifyContent: 'space-around', display: 'flex' }}>
        <Grid sx={{ mt:2.5,ml:1}}>
          <PopoverField
            icon={<AttachFileIcon />}
            values={userFiles && userFiles}
            title={'files'}
            type={'files'}
          />
        </Grid>
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
