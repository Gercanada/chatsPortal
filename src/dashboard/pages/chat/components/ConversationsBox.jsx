import { Avatar, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../../components/Loader';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { setReadMessages } from '../../../../store/slices/whatsApp/thunks';
import PopoverField from '../../../../components/Popovers/PopoverField';

const ConversationsBox = ({ messages }) => {
  const newMessageRef = useRef(null);
  const [sortMessages, setSortMessages] = useState([]);
  const dispatch = useDispatch();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState([]);
  const theme = localStorage.getItem('chat_account_type');

  //const backgroundImageUrl = '/images/que-ver-en-vancouver.jpg';
  //const backgroundImageUrl = '/public/images/immcaselogo.png';
  const gridStyle = {
    position: 'relative',
    width: '100%',
    height: '75vh',
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'end',
    overflow: 'auto',
  };
  const { loading } = useSelector((state) => state.whatsApp);

  useEffect(() => {
    
    theme === 'Iphone chino'
    ?setBackgroundImageUrl('/images/fondoChatVivetel.png')
    :theme === 'Vive Wha'
    ?setBackgroundImageUrl('/images/fondoChatVive.png')
    :theme === 'Test Number'
    ?setBackgroundImageUrl('/images/fondoChatLabo.png')
    :''
  }, [theme]);

  useEffect(() => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sortArray = () => {
    const originalData = messages;
    if (originalData) {
      const sortValues = [...originalData].reverse();
      console.log('sortValues', sortValues);
      setSortMessages(sortValues);
    }
    const messagesId = originalData?.map((item, index) => {
      return item?.id;
    });
    dispatch(setReadMessages(messagesId));
    console.log('messahesidd', messagesId);
  };

  useEffect(() => {
    sortArray();
  }, [messages]);

  console.log('messages', sortMessages);
  return (
    <Grid container style={gridStyle}>
      {loading && <Loader />}
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
                <Card sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                  {/* <Avatar alt='user_photo' src={''} /> */}

                  <TextField
                    value={item?.body}
                    disabled
                    multiline
                    sx={{ m: 1, width: '97%' }}
                    variant='filled'
                  />

                  <Grid sx={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'end', m: 1, textDecoration:'underline' }}>
                      <PopoverField values={item?.readers} title ={'readers'}/>
                    </Typography>
                    <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                  </Grid>
                </Card>
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
              <Card sx={{ display: 'flex', flexDirection: 'column', width: '45%'}}>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ width: '100%', ml: 1 }}>{item?.creator?.name}</Typography>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Avatar sx={{ m: 1 }} alt='user_photo' src={''} />
                  <TextField
                    value={item?.body}
                    disabled
                    multiline
                    sx={{ m: 1, width: '100%' }}
                    variant='filled'
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
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
