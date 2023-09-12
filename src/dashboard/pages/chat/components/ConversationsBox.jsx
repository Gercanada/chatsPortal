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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState([]);
  // const [backgroundColor, setBackgroundColor] = useState('');
  const themeAccount = localStorage.getItem('chat_account_type');
  const isLightTheme = localStorage.getItem('isLightTheme');
  const [openModal, setOpenModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const lastMessageRef = useRef(null);
  const ultimoMensajeRef = useRef(null);

  const memoizedLoadMoreChats = useCallback(() => {
    loadMoreChats();
  }, [loadMoreChats]);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Load more messages here
      memoizedLoadMoreChats();
    }
  };
  useLayoutEffect(() => {
    if (newMessageRef.current && gridRef.current) {
      // Ajustar el scroll al elemento newMessageRef solo si el gridRef existe
      gridRef.current.scrollTop = newMessageRef.current.offsetTop;
    }
  }, [messages]); 

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    if (lastMessageRef.current) {
      observer.observe(lastMessageRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (lastMessageRef.current) {
        observer.unobserve(lastMessageRef.current);
      }
    };
  }, [lastMessageRef, memoizedLoadMoreChats]);

  const bubbleStyle = {
    padding: '8px 16px',
    marginBottom: '8px',
    maxWidth: '70%',
    backgroundColor: '#005c4b',
    borderRadius: '10px',
  };

  // Memoize messages prop
  const memoizedMessages = useMemo(() => messages || [], [messages]);

  // Memoize background image and color
  const { backgroundImageUrl, backgroundColor } = useMemo(() => {
    let backgroundImageUrl = '';
    let backgroundColor = '';

    switch (themeAccount) {
      case 'Iphone chino':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/gerclaro.svg' : '/images/gerdark.svg';
        backgroundColor = isLightTheme === 'yes' ? '#CCE2FF' : '#151719';
        break;
      case 'ViveCanada Edu Services LTD':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/prueba_vive.svg' : '/images/fondoDarkViveCanada.svg';
        backgroundColor = isLightTheme === 'yes' ? '#ffd1b3' : '#151719';
        break;
      case 'Vivetel Networks Ltd':
        backgroundImageUrl =
          isLightTheme === 'yes' ? '/images/telclaro.svg' : '/images/vivetel.svg';
        backgroundColor = isLightTheme === 'yes' ? '#EAD9FF' : '#151719';
        break;
      default:
        backgroundImageUrl = '';
        backgroundColor = '';
    }

    return { backgroundImageUrl, backgroundColor };
  }, [themeAccount, isLightTheme]);

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
    handleNewMessage(); // Llama a la función para ajustar el scroll cuando cambian los mensajes
  }, [messages]); 

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
        {/* {pageNumber <= hasMoreChats && ( */}
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
        {/* )} */}
        {memoizedMessages?.map((item, index) =>
          item?.Contact === item?.from ? (
            <Grid
              key={index}
             ref={ index === memoizedMessages.length - 1 && pageNumber === 1 ? newMessageRef : null}
              // ? newMessageRef : null}
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
                    {/* <BoxMessage
                      isResponse={true}
                      type={'text'}
                      messageContainer={{ value: item?.body, at: item?.at, readers: item?.readers }}
                    /> */}
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
                        }} />
                      <TextField
                        className='textField2'
                        value={item?.body}
                        multiline
                        variant='standard'
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true,
                        }} />
                      <Grid
                        sx={{ textAlign: 'end', display: 'flex', justifyContent: 'space-between' }}
                      >
                        <PopoverField values={item?.readers} title={'readers'} type={'users'} />
                        <Typography sx={{ textAlign: 'end', mr: 1 }}>{item?.at}</Typography>
                      </Grid>
                    </Paper>
                  </>
                ) : (
                  <BoxMessage
                    isResponse={true}
                    type={'text'}
                    messageContainer={{ value: item?.body, at: item?.at, readers: item?.readers }}
                  />
                )
              ) : item?.type === 'audio' ? (
                <audio controls>
                  <source src={`https://chat.immcase.com/${item?.media_url}`} type='audio/ogg' />
                </audio>
              ) : (
                <>
                  {item?.media_url.split('/')[4] === 'images' ? (
                    <>
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
                        <img
                          src={`https://chat.immcase.com/${item?.media_url}`}
                          width='100px'
                          alt=''
                        />
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant='h1'
                      component='h6'
                      sx={{
                        textAlign: 'center',
                        ml: 10,
                      }}
                      display='flex'
                    >
                      <img
                        src={`https://chat.immcase.com/${item?.media_url}`}
                        width='100px'
                        alt=''
                      />
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          ) : (
            <Grid
              key={index}
              ref={index === memoizedMessages.length - 1  && pageNumber === 1  ? newMessageRef : null}
              sx={{
                m: 1,
                width: '98%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              <BoxMessage
                isResponse={false}
                type={'text'}
                messageContainer={{
                  value: item?.body,
                  at: item?.at,
                  readers: item?.readers,
                  reaction: item?.reaction?.body,
                  read: item?.status,
                  creator: item?.creator?.name,
                }}
              />
            </Grid>
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default ConversationsBox;
