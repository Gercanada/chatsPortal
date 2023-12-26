import { Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PopoverField from '../../../../components/Popovers/PopoverField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './chatsStyles.css';
import ImageModal from '../../../../components/Modal/ImageModal';
import { useTranslation } from 'react-i18next';
import BoxMessage from './BoxMessage';

export const styles = {
  root: {
    background: 'black',
  },
  input: {
    color: 'white',
  },
};

const ConversationsBox = ({ messages, hasMoreChats, pageNumber, loadMoreChats }) => {
  const newMessageRef = useRef(null);
  const baseURLFiles = import.meta.env.VITE_IMMCASE_CHAT_FILES;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const isLightTheme = localStorage.getItem('isLightTheme');
  const { backgroundTheme } = useSelector((state) => state.ui);
  const [openModal, setOpenModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const lastMessageRef = useRef(null);

  const memoizedLoadMoreChats = useCallback(() => {
    loadMoreChats();
  }, [loadMoreChats]);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      memoizedLoadMoreChats();
    }
  };

  useLayoutEffect(() => {
    if (newMessageRef.current && gridRef.current) {
      gridRef.current.scrollTop = newMessageRef.current.offsetTop;
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (lastMessageRef.current) {
      observer.observe(lastMessageRef.current);
    }

    return () => {
      if (lastMessageRef.current) {
        observer.unobserve(lastMessageRef.current);
      }
    };
  }, [lastMessageRef, memoizedLoadMoreChats]);

  const memoizedMessages = useMemo(() => messages || [], [messages]);

  // console.log("memoizedMessages",memoizedMessages)
  const bubbleStyleRequest = {
    // padding: '8px 16px',
    // marginBottom: '8px',
    // maxWidth: '70%',
    color:'white',
    backgroundColor: '#005c4b',
    borderRadius: '10px',
  };

  const gridStyle = {
    position: 'relative',
    height: '74vh',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundColor: `${backgroundColor}`,
    overflow: 'auto',
  };

  const bubbleStyleResponse = {
    padding: '8px 16px',
    marginBottom: '8px',
    maxWidth: '70%',
    borderRadius: '10px',
  };

  useEffect(() => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleNewMessage = () => {
    if (newMessageRef.current) {
      newMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, [messages]);

  useEffect(() => {
    let backgroundImageUrl = '';
    let backgroundColor = '';
    switch (backgroundTheme) {
      case 'Iphone chino':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/gerclaro.svg' : '/images/gerdark.svg';
        backgroundColor = isLightTheme === 'yes' ? '#CCE2FF' : '#151719';
        setBackgroundColor(backgroundColor);
        setBackgroundImageUrl(backgroundImageUrl);
        break;
      case 'ViveCanada Edu Services LTD':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/VIVELIGHT.svg' : '/images/VIVEDARK.svg';
        backgroundColor = isLightTheme === 'yes' ? '#ffd1b3' : '#151719';
        setBackgroundColor(backgroundColor);
        setBackgroundImageUrl(backgroundImageUrl);
        break;
      case 'Vivetel Networks Ltd':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/TELLIGHT.svg' : '/images/TELDARK.svg';
        backgroundColor = isLightTheme === 'yes' ? '#EAD9FF' : '#151719';
        setBackgroundColor(backgroundColor);
        setBackgroundImageUrl(backgroundImageUrl);
        break;
      case 'Immcase Digital Solutions Ltd':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/IMMCASELIGHT.svg' : '/images/IMMCASEDARK.svg';
        backgroundColor = isLightTheme === 'yes' ? '#a5cd38' : '#151719';
        setBackgroundColor(backgroundColor);
        setBackgroundImageUrl(backgroundImageUrl);
        break;
      case 'Easy Eta by Ger Canada':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/GERLIGHT.svg' : '/images/GERDARK1.svg';
        backgroundColor = isLightTheme === 'yes' ? '#cde2ff' : '#151719';
        setBackgroundColor(backgroundColor);
        setBackgroundImageUrl(backgroundImageUrl);
        break;
      default:
        backgroundImageUrl = '';
        backgroundColor = '';
    }
  }, [backgroundTheme, isLightTheme]);

  return (
    <Grid
      container
      style={gridStyle}
      className='box-container'
      sx={{ backgroundSize: '100% 100%' }}
      ref={gridRef}
    >
      <ImageModal
        open={openModal}
        mediaUrl
        imageUrl={mediaUrl}
        onClose={setOpenModal}
        title={t('Image')}
      />
      <Grid item xs={12}>
        {pageNumber < hasMoreChats && (
          <Grid
            onClick={memoizedLoadMoreChats}
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
          </Grid>
        )}
        {memoizedMessages?.map((item, index) =>
          item?.Contact === item?.from ? (
            <Grid
              key={index}
               ref={index === memoizedMessages.length - 1 && pageNumber === 0 ? newMessageRef : null}
              //ref={newMessageRef}
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
                  <>
                    <Paper
                      elevation={0}
                      style={bubbleStyleResponse}
                      sx={{ display: 'flex', flexDirection: 'column', width: '45%' }}
                    >
                      <TextField
                        value={item?.reply_to?.body}
                        className='textField2'
                        multiline
                        variant='filled'
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true,
                        }}
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
                        <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                        <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                      </Grid>
                    </Paper>
                  </>
                ) : item?.type === 'document' ? (
                  <BoxMessage
                    isResponse={true}
                    type={'text'}
                    messageContainer={{
                      value: `${baseURLFiles}${item?.media_url}`,
                      at: item?.at,
                      readers: item?.readers,
                      typeMessage: item?.type,
                      mediaUrl: item?.url,
                    }}
                  />
                ) : (
                  <BoxMessage
                    isResponse={true}
                    type={'text'}
                    messageContainer={{
                      value: item?.body,
                      at: item?.at,
                      readers: item?.readers,
                      typeMessage: item?.type,
                      mediaUrl: item?.url,
                    }}
                  />
                )
              ) : item?.type === 'audio' ? (
                <Grid>
                  <audio controls>
                    <source src={`${baseURLFiles}${item?.media_url}`} type='audio/ogg' />
                  </audio>
                  <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                    <Typography sx={{ textAlign: 'end' }}>{item.at}</Typography>
                  </Grid>
                </Grid>
              ) : item?.type === 'document' ? (
                <BoxMessage
                  isResponse={true}
                  type={'text'}
                  messageContainer={{
                    value: `${baseURLFiles}${item?.media_url}`,
                    at: item?.at,
                    readers: item?.readers,
                    typeMessage: item?.type,
                    mediaUrl: item?.url,
                  }}
                />
              ) : (
                <>
                  {item?.media_url.split('/')[3] === 'images' ? (
                    <Grid>
                      <Typography
                        onClick={() => {
                          setOpenModal(true);
                          setMediaUrl(`${baseURLFiles}${item?.media_url}`);
                        }}
                        variant='h1'
                        component='h6'
                        sx={{
                          textAlign: 'center',
                          ml: 10,
                          border: '2px white solid',
                          cursor: 'pointer',
                        }}
                        display='flex'
                      >
                        <img src={`${baseURLFiles}${item?.media_url}`} width='200px' alt='' />
                      </Typography>
                      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                        <Typography sx={{ textAlign: 'end' }}>{item.at}</Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid>
                      <Typography
                        variant='h1'
                        component='h6'
                        sx={{
                          textAlign: 'center',
                          ml: 10,
                        }}
                        display='flex'
                      >
                        <img src={`${baseURLFiles}${item?.media_url}`} width='100px' alt='' />
                      </Typography>
                      <Typography sx={{ textAlign: 'end' }}>{item.at}</Typography>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          ) : (
            <Grid
              key={index}
              ref={index === memoizedMessages.length - 1 && pageNumber === 0 ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              {(item?.has_media === 0 && item.type === 'text') ||
              (item?.has_media === 0 && item.type === 'document') ? (
                <BoxMessage
                  isResponse={false}
                  type={'text'}
                  messageContainer={{
                    typeMessage: item?.type,
                    value: item?.body,
                    at: item?.at,
                    readers: item?.readers,
                    reaction: item?.reaction?.body,
                    read: item?.status,
                    creator: item?.creator?.name,
                  }}
                />
              ) : item?.type === 'audio' ? (
                <Grid>
                  <audio controls>
                    <source src={`${baseURLFiles}${item?.media_url}`} type='audio/ogg' />
                  </audio>
                  <Typography sx={{ textAlign: 'end' }}>{item.at}</Typography>
                </Grid>
              )  : item?.type === 'template' ? (
                <BoxMessage
                  isResponse={false}
                  type={'text'}
                  messageContainer={{
                    typeMessage: item?.type,
                    value:JSON.parse(item?.body).name,
                    at: item?.at,
                    readers: item?.readers,
                    reaction: item?.reaction?.body,
                    read: item?.status,
                    creator: item?.creator?.name,
                  }}
                />
                
              )  : item?.type === 'image' ? (
                <Grid>
                  <Typography
                    onClick={() => {
                      setOpenModal(true);
                      setMediaUrl(item?.media_url);
                    }}
                    variant='h1'
                    component='h6'
                    sx={{
                      textAlign: 'center',
                      ml: 10,
                      border: '2px white solid',
                      cursor: 'pointer',
                    }}
                    display='flex'
                  >
                    <img src={`${item?.media_url}`} width='200px' alt='' />
                  </Typography>
                  <Grid sx={{}}>
                    {/* <PopoverField values={item?.readers} title={'readers'} type={'users'} /> */}
                    <Typography sx={{ textAlign: 'end' }}>{item.at}</Typography>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
