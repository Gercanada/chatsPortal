import { Avatar, Card, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../../components/Loader';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getMoreMessages, setReadMessages } from '../../../../store/slices/whatsApp/thunks';
import PopoverField from '../../../../components/Popovers/PopoverField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './chatsStyles.css';
import { BorderBottom } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

export const styles = {
  root: {
    background: 'black',
  },
  input: {
    color: 'white',
  },
};

const ConversationsBox = ({ messages }) => {
  const classes = styles;
  const { thread } = useParams();
  const newMessageRef = useRef(null);
  const [sortMessages, setSortMessages] = useState([]);
  const dispatch = useDispatch();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('');
  const themeAccount = localStorage.getItem('chat_account_type');
  const isLightTheme = localStorage.getItem('isLightTheme');

  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '75vh',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: `${backgroundColor}`,
    display: 'flex',
    overflow: 'auto',
  };

  const bubbleStyle = {
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
    themeAccount === 'Iphone chino' && isLightTheme === 'yes'
      ? (setBackgroundImageUrl('/images/gerclaro.svg'), setBackgroundColor('#CCE2FF'))
      : themeAccount === 'Iphone chino' && isLightTheme === 'no'
      ? (setBackgroundImageUrl('/images/gerdark.svg'), setBackgroundColor('#151719'))
      : themeAccount === 'ViveCanada Edu Services LTD' && isLightTheme === 'yes'
      ? (setBackgroundImageUrl('/images/prueba_vive.svg'), setBackgroundColor('#ffd1b3'))
      : themeAccount === 'ViveCanada Edu Services LTD' && isLightTheme === 'no'
      ? (setBackgroundImageUrl('/images/fondoDarkViveCanada.svg'), setBackgroundColor('#151719'))
      : themeAccount === 'Vivetel Networks Ltd' && isLightTheme === 'yes'
      ? (setBackgroundImageUrl('/images/telclaro.svg'), setBackgroundColor('#EAD9FF'))
      : themeAccount === 'Vivetel Networks Ltd' && isLightTheme === 'no'
      ? (setBackgroundImageUrl('/images/vivetel.svg'), setBackgroundColor('#151719'))
      : '';
  }, [themeAccount, isLightTheme]);

  useEffect(() => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sortArray = () => {
    const originalData = messages;
    if (originalData) {
      const sortValues = [...originalData].reverse();
      setSortMessages(sortValues);
    }
    const messagesId = originalData?.map((item, index) => {
      return item?.id;
    });
    dispatch(setReadMessages(messagesId));
  };

  //   const styles = theme => ({
  //     multilineColor:{
  //         color:'red'
  //     }
  // });

  const handleShowMoreMessages = () => {
    const pageNumberCounter = pageNumber + 1;
    setPageNumber(pageNumberCounter);
    dispatch(getMoreMessages(thread, pageNumberCounter));
  };

  useEffect(() => {
    sortArray();
  }, [messages]);

  return (
    <Grid
      container
      style={gridStyle}
      className='box-container'
      sx={{ backgroundSize: '100% 100%' }}
    >
      <Grid item xs={12}>
        {/* <Grid
          onClick={handleShowMoreMessages}
          sx={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            margin: 'auto',
            color: 'white',
          }}
        >
          <ArrowUpwardIcon sx={{ margin: 'auto' }} />
        </Grid> */}
        {sortMessages?.map((item, index) =>
          item?.Contact === item?.from ? (
            <Grid
              key={index}
              ref={index === sortMessages.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
              }}
            >
              {item?.has_media === 0 ? (
                item?.reply_to ? (
                  <Card sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                    {/* <Avatar alt='user_photo' src={''} /> */}

                    <TextField
                      value={item?.reply_to?.body}
                      disabled
                      multiline='true'
                      sx={{ m: 1, width: '97%' }}
                      variant='filled'
                    />
                    <TextField
                      className='textField2'
                      value={item?.body}
                      multiline
                      variant='standard'
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                    <Grid
                      sx={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}
                    >
                      {/* <Typography sx={{ textAlign: 'end', m: 1, textDecoration: 'underline' }}> */}
                      <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                      {/* </Typography> */}
                      <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                    </Grid>
                  </Card>
                ) : (
                  <Paper
                    elevation={0}
                    style={bubbleStyleResponse}
                    sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}
                  >
                    {/* <Avatar alt='user_photo' src={''} /> */}
                    <TextField
                      className='textField2'
                      value={item?.body}
                      multiline
                      variant='standard'
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />

                    <Grid
                      sx={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}
                    >
                      {/* <Typography sx={{ textAlign: 'end', m: 1, textDecoration: 'underline' }}> */}
                      <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                      {/* </Typography> */}
                      <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                    </Grid>
                  </Paper>
                )
              ) : item?.type === 'audio' ? (
                <audio controls>
                  <source src={`https://chat.immcase.com/${item?.media_url}`} type='audio/ogg' />
                </audio>
              ) : (
                <Typography
                  variant='h1'
                  component='h6'
                  sx={{ textAlign: 'center', ml: 10 }}
                  display='flex'
                >
                  <img src={`https://chat.immcase.com/${item?.media_url}`} width='100px' alt='' />
                </Typography>
              )}
            </Grid>
          ) : (
            <Grid
              key={index}
              ref={index === messages.length - 1 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              {/* <Card sx={{ display: 'flex', flexDirection: 'column', width: '45%', backgroundColor:'#005c4b',color:'white' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ width: '100%', ml: 1 }}>{item?.creator?.name}</Typography>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>

                  <Typography disabled multiline sx={{ m: 1, width: '97%' }} variant='filled'>
                    {item?.body}
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: 'end', display: 'flex', justifyContent: 'end' }}>
                  {item?.reaction?.body && item?.reaction?.body}
                  <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                  <DoneAllIcon
                    sx={{ textAlign: 'end', mr: 1 }}
                    color={item?.status === 'read' ? 'primary' : 'black'}
                  />
                </Grid>
              </Card> */}
              <Paper
                elevation={0}
                style={bubbleStyle}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '45%',
                  backgroundColor: '#005c4b',
                  color: 'white',
                }}
              >
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ width: '100%', ml: 1, color: '#40a3c3' }}>
                    {item?.creator?.name}
                  </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <TextField
                    className='textField'
                    value={item?.body}
                    multiline
                    variant='standard'
                    disabled
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid sx={{ textAlign: 'end', display: 'flex', justifyContent: 'end' }}>
                  {item?.reaction?.body && item?.reaction?.body}
                  <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                  <DoneAllIcon
                    sx={{ textAlign: 'end', mr: 1 }}
                    color={item?.status === 'read' ? 'primary' : 'black'}
                  />
                </Grid>
              </Paper>
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
