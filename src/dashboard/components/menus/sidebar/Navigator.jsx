import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PhoneModal from '../../../../components/Modal/PhoneModal';
import { useEffect } from 'react';
import {
  getCategoriesColors,
  getChats,
  getMoreChats,
  getMoreMessages,
  getPhoneAccounts,
  getSwitchAccount,
  sendMessage,
  updateCategoryColor,
} from '../../../../store/slices/whatsApp/thunks';
import AdjustIcon from '@mui/icons-material/Adjust';
import Circle from '../../../../components/forms/Circle';
import ColorMenu from '../../../../components/menus/ColorMenu';
import { toast } from 'react-toastify';
import { Loader } from '../../../../components/Loader';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { setBackgroundThemeBox } from '../../../../store/slices/ui/thunks';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import GroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
export default function Navigator(props) {
  const { ...other } = props;
  const { id, thread } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changedColor, setChangedColor] = useState(false);
  const [isInto, setIsInto] = useState(false);
  const [changeAccount, setChangeAccount] = useState(false);
  const [numberPhone, setNumberPhone] = useState('');
  const [extensionNumber, setExtensionNumber] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [chatsAccount, setChatsAccount] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [openModalContact, setOpenModalContact] = useState(false);
  const [idAccount, setIdAccount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreChats, setHasMoreChats] = useState(1);
  const { chats, loading, phoneAccounts, categoriesColors } = useSelector(
    (state) => state.whatsApp,
  );
  const { isLightTheme } = useSelector((state) => state.ui);
  const navigateTo = (url) => {
    navigate(url);
  };

  console.log('cchatsukis', chatsAccount);

  const handleAccount = (id, event, theme) => {
    console.log('eveeents',event.target)
    console.log('expanded',expanded)
    // if (
    //   event?.target?.nodeName === 'DIV' ||
    //   event?.target?.nodeName === 'P' ||
    //   event?.target?.nodeName === 'IMG' ||
    //   event?.target?.nodeName === 'path' ||
    //   event?.target?.dataset.testid === 'ExpandMoreIcon'
    // ) {
      setIsInto(true);
      setIdAccount(id);
      dispatch(getSwitchAccount(id));
      dispatch(getChats());
      setPageNumber(1);
      setHasMoreChats(1);
    // }
  };

  const handleSetChatCategory = async (id, categoryId) => {
    const resp = await dispatch(updateCategoryColor(id, categoryId));
    if (resp === 200) {
      toast.success(t('saved'));
      setChangedColor(!changedColor);
    } else {
      toast.error(t('error'));
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getChats());

    setIsInto(false);
    if (chats?.data) {
      let value = chats?.data;
      setChatsAccount(chats?.data);
    }
  }, [idAccount, isInto, changeAccount]);

  useEffect(() => {
    if (chats) {
      let value = chats?.data;
      setChatsAccount(value);
    }
  }, [changeAccount]);

  useEffect(() => {
    dispatch(getCategoriesColors());
  }, [changedColor]);

  useEffect(() => {
    dispatch(getPhoneAccounts());
  }, []);

  const loadChats = async () => {
    const resp = await dispatch(getChats());
    if (resp) {
      setChatsAccount(resp?.data?.data?.data);
      setHasMoreChats(resp?.data?.data?.last_page);
    }
    console.log("holaaresp",resp)
  };
  const loadMoreChats = async () => {
    const pageNumberCounter = pageNumber + 1;
    setPageNumber(pageNumberCounter);
    const response = await dispatch(getMoreChats(pageNumberCounter));
    if (response && response.data) {
      setChatsAccount((prevChats) => [...prevChats, ...response?.data?.data?.data]);
      setHasMoreChats(response?.data?.data?.last_page);
    } else {
      toast.error(t('error'));
    }
  };

  const handleTheme = (theme) => {
    dispatch(setBackgroundThemeBox(theme));
  };

  useEffect(() => {
    loadChats();
  }, [idAccount, isInto, changeAccount]);

  useEffect(() => {
    //Pusher.logToConsole = true;
    const pusher = new Pusher('87a001442582afe960c1', { cluster: 'us2' });
    const channel = pusher.subscribe('chat');
    let userThread = '';
    channel.bind('message', function (data) {
      // playSound();
      // allMessages.push(data);
      const jsonObject = JSON.parse(data.message);
      loadChats()
      console.log("holaaaa")
      if (jsonObject.body) {
        userThread = jsonObject.thread.id;
     //   loadChats()
        // if (jsonObject.account) {
        //   toast.error(`${'\n'}${jsonObject.thread.name}:${jsonObject.body}`, {
        //     autoClose: 20000,
        //     icon: company,
        //     // style:toastStyle,
        //     progressStyle: toastStyle,
        //   });
        // } else {
        //   toast.error(`${jsonObject.from}:${jsonObject.body}`, {
        //     autoClose: 20000,
        //   });
        // }
        // if (userThread === thread) {
        //   loadChats();
        // }
      }
    });
  }, []);

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <PhoneModal open={openModalContact} onClose={setOpenModalContact} title={t(`add_chat`)} />
        <Typography
          variant='h1'
          component='h6'
          sx={{ textAlign: 'center', ml: 10, mt: 1 }}
          display='flex'
        >
          <img src='/images/vivechat.png' width='75px' alt='' />
        </Typography>
        {/* <Typography>{t('conversations')}</Typography> */}
        {phoneAccounts &&
          phoneAccounts?.map(
            (account, index) => (
              (
                <React.Fragment>
                  {account?.name !== '' && (
                    <Accordion
                      key={index}
                      expanded={expanded === index}
                      name={'organization'}
                      onChange={handleChange(index)}
                      sx={{ boxShadow: '0', background: 'inherit' }}
                      onClick={(event) => {
                        handleAccount(account?.id, event);
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        {account?.name === 'Vivetel Networks Ltd' ? (
                          <img src='/images/ViveTel.png' width='30px' alt='' />
                        ) : account?.name === 'ViveCanada Edu Services LTD' ? (
                          <img src='/images/ViveCanada.png' width='30px' alt='' />
                        ) : account?.name === 'Test Number' ? (
                          <img src='/images/labores.png' width='30px' alt='' />
                        ) : account?.name === 'Immcase Digital Solutions Ltd' ? (
                          <img src='/images/ImmCaseChat.png' width='30px' alt='' />
                        ) : account?.name === 'Easy Eta by Ger Canada' ? (
                          <img src='/images/GerCanadaChat.png' width='30px' alt='' />
                        ) : (
                          ''
                        )}
                        <Grid sx={{display:'flex', flexDirection:'column',}}>
                          <Typography  variant='p' sx={{ fontSize:'12px'}}>{account?.name}</Typography>
                          <Typography  variant='p' sx={{ fontSize:'12px'}}>{account?.display_phone_number}</Typography>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          paddingBottom: '8px',
                          px: 0,
                          overflow: 'auto',
                          maxHeight: '500px',
                        }}
                      >
                        <Grid
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mb: 1,
                            justifyContent: 'space-around',
                          }}
                          key={index}
                        >
                          <Button
                            name={'newChat'}
                            id={index}
                            sx={{ width: '100%', display: 'flex' }}
                            onClick={() => {
                              setOpenModalContact(true);
                            }}
                          >
                            <Grid
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                              }}
                            >
                              <AddCommentOutlinedIcon sx={{ mr: 3 }} fontSize='small' />
                              <Typography>{t('new_chat')}</Typography>
                            </Grid>
                          </Button>
                        </Grid>
                        {chatsAccount &&
                          chatsAccount?.map((item, index) => (
                            <Grid sx={{ display: 'flex', flexDirection: 'row', mb: 1 }} key={index}>
                              <>
                                <Circle
                                  id={item?.id}
                                  selected={item?.category?.color !== 'gray'}
                                  values={categoriesColors}
                                  onClick={handleSetChatCategory}
                                  color={item?.category?.color}
                                />
                                <Button
                                  name={item.number}
                                  id={index}
                                  sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                  }}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    navigateTo(
                                      `/chat/${item.client_phone_number}/${item.id}/${item.name}`,
                                    );
                                    handleTheme(account?.name);
                                    localStorage.setItem('chat_account_type', account?.name);
                                  }}
                                >
                                  <Grid sx={{ display: 'flex' }}>
                                    <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
                                      <Typography>{item.name && `${item?.name}`}</Typography>
                                      <Typography>{`${item?.client_phone_number} `}</Typography>
                                    </Grid>
                                  </Grid>
                                  {item?.unread > 0 ? <AdjustIcon /> : ''}
                                </Button>
                              </>
                            </Grid>
                          ))}
                      </AccordionDetails>
                      {pageNumber < hasMoreChats && (
                        <Grid
                          onClick={loadMoreChats}
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
                          <ArrowDownwardIcon sx={{ margin: 'auto' }} />
                        </Grid>
                      )}
                    </Accordion>
                  )}
                </React.Fragment>
              )
            ),
          )}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <GroupIcon sx={{ width: '30px' }} />
            <Typography sx={{ ml: 2.5 }}>{t('users')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingBottom: '8px', px: 0 }}>
            <Grid sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', mb: 1 }}>
              <Button
                name={'users'}
                sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                onClick={() => {
                  navigateTo(`/users`);
                }}
              >
                <GroupIcon />
                {t('users')}
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <ContactsIcon sx={{ width: '30px' }} />
            <Typography sx={{ ml: 2.5 }}>{t('contacts')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingBottom: '8px', px: 0 }}>
            <Grid sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', mb: 1 }}>
              <Button
                name={'contacts'}
                sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                onClick={() => {
                  navigateTo(`/contacts`);
                }}
              >
                <ContactsIcon />
                {t('contacts')}
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </List>
    </Drawer>
  );
}
