import { Avatar, Card, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../../components/Loader';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { setReadMessages } from '../../../../store/slices/whatsApp/thunks';
import PopoverField from '../../../../components/Popovers/PopoverField';
import './chatsStyles.css';

const ConversationsBox = ({ messages }) => {
  const newMessageRef = useRef(null);
  const [sortMessages, setSortMessages] = useState([]);
  const dispatch = useDispatch();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('');
  const themeAccount = localStorage.getItem('chat_account_type');
  const isLightTheme = localStorage.getItem('isLightTheme');

  //const backgroundImageUrl = '/images/que-ver-en-vancouver.jpg';
  //const backgroundImageUrl = '/public/images/immcaselogo.png';
  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '75vh',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: `${backgroundColor}`,
    display: 'flex',
    justifyContent: 'end',
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
    //  backgroundColor:'white',
    borderRadius: '10px',
  };

  const { loading } = useSelector((state) => state.whatsApp);

  useEffect(() => {
    themeAccount === 'Iphone chino' && isLightTheme === 'yes'
      ? (setBackgroundImageUrl('/images/gerclaro.svg'), setBackgroundColor('#CCE2FF'))
      : themeAccount === 'Iphone chino' && isLightTheme === 'no'
      ? (setBackgroundImageUrl('/images/gerdark.svg'), setBackgroundColor('#151719'))
      : themeAccount === 'Vive Wha' && isLightTheme === 'yes'
      ? (setBackgroundImageUrl('/images/prueba_vive.svg'), setBackgroundColor('#ffd1b3'))
      : themeAccount === 'Vive Wha' && isLightTheme === 'no'
      ? (setBackgroundImageUrl('/images/fondoDarkViveCanada.svg'), setBackgroundColor('#151719'))
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
      {/* {loading && <Loader />} */}
      <Grid item xs={12}>
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
                    <Typography
                      disabled
                      multiline='true'
                      sx={{ m: 1, width: '97%' }}
                      variant='filled'
                    >
                      {item?.body}
                    </Typography>
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
                    <Typography
                      disabled
                      multiline='true'
                      sx={{ m: 1, width: '97%' }}
                      variant='filled'
                    >
                      {item?.body}
                    </Typography>

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
                  <Typography
                    disabled
                    multiline='true'
                    sx={{ m: 1, width: '97%' }}
                    variant='filled'
                  >
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
              </Paper>
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
