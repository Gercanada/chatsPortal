import { Card, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useEffect, useState } from 'react';
import {
  getTemplatesOptions,
  getUserChat,
  getUserFiles,
  sendMessage,
  sendTemplate,
} from '../../../../store/slices/whatsApp/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PopoverField from '../../../../components/Popovers/PopoverField';
import PopoverItems from '../../../../components/Popovers/PopoverItems';
import AddIcon from '@mui/icons-material/Add';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//import io from 'socket.io-client'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

//const socket =io("/")

const MessagesField = ({ setHasChange, loadChats }) => {
  const [valueMessage, setValueMessage] = useState('');
  const [audioMessage, setAudioMessage] = useState('');
  const { id, thread, prefix } = useParams();
  const [isAudio, setIsAudio] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [hasMessage, setHasMessage] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { userFiles, templatesOptions } = useSelector((state) => state.whatsApp);
  const modalDetails = [{ name_: t('templates'), key: 'templates', type: 'select' }];

  const handleSendTemplate = (values) => {
    dispatch(sendTemplate(id,values.name,values.language))
  }
  
  const selectsCreate = new Map();
  selectsCreate.set('templates', templatesOptions && templatesOptions );

  const menuAttachments = [
    {
      attachment: 'images',
      icon: <ImageRoundedIcon color='primary' />,
      type: 'image/*',
      attachType: 'file',
    },
    {
      attachment: 'file',
      icon: <DescriptionRoundedIcon color='error' />,
      type: '*/*',
      attachType: 'file',
    },
    {
      attachment: 'templates',
      key:'templates',
      icon: <DocumentScannerIcon color='success' />,
      type: '*/*',
      selectOptions: selectsCreate,
      attachType: 'select',
      modalDetails:modalDetails,
    },
  ];
  
  useEffect(() => {
    dispatch(getUserFiles(thread));
    dispatch(getTemplatesOptions());
  }, [id]);

  const handleOnchange = (e) => {
    const textValue = e.target.value;
    if (!textValue) {
      setHasMessage(true);
      setValueMessage(textValue);
    } else {
      setHasMessage(false);
      setValueMessage(textValue);
    }
  };

  const handleSendMessage = async () => {
    setValueMessage('');
    setHasChange(true);
    setHasMessage(true);
    if (audioMessage) {
      setIsAudioOpen(false);
      const audio = audioMessage.replace('blob:', '');
      const resp = await dispatch(sendMessage(id, audio));
      if (resp === 200) {
        loadChats();
        dispatch(getUserChat(id));
        toast.success(t('sent'));
      }
    } else {
      const resp = await dispatch(sendMessage(id, valueMessage));
      if (resp === 200) {
        loadChats();
        dispatch(getUserChat(id));
        toast.success(t('sent'));
      }
    }
  };

  const handleAudio = async () => {
    if (!isAudio) {
      setIsAudio(true);
      setIsAudioOpen(true);
    } else {
      setIsAudio(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };
  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <Card sx={{ justifyContent: 'space-around', display: 'flex' }}>
          <Grid sx={{ mt: 2.5, ml: 1 }}>
            <PopoverItems
              icon={<AddIcon />}
              attachments={menuAttachments}
              values={userFiles && userFiles}
              title={'files'}
              type={'files'}
              onSubmit={handleSendTemplate}
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
          >
            <SendIcon />
          </IconButton>
        </Card>
      </form>
    </Grid>
  );
};

export default MessagesField;
