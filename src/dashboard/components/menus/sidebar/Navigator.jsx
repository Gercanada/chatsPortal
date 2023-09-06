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
  updateCategoryColor,
} from '../../../../store/slices/whatsApp/thunks';
import AdjustIcon from '@mui/icons-material/Adjust';
import Circle from '../../../../components/forms/Circle';
import ColorMenu from '../../../../components/menus/ColorMenu';
import { toast } from 'react-toastify';
import { Loader } from '../../../../components/Loader';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const { id, thread } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLightTheme } = useSelector((state) => state.ui);
  const [changedColor, setChangedColor] = useState(false);
  const [isInto, setIsInto] = useState(false);
  const [changeAccount, setChangeAccount] = useState(false);
  const [idAccount, setIdAccount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreChats, setHasMoreChats] = useState(1);
  const { chats, loading, phoneAccounts, categoriesColors } = useSelector(
    (state) => state.whatsApp,
  );
  const [chatsAccount, setChatsAccount] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [accumulatedChats, setAccumulatedChats] = useState([]);

  const navigateTo = (url) => {
    navigate(url);
  };

  const handleAccount = (id, event) => {
    if (
      event?.target?.nodeName === 'DIV' ||
      event?.target?.nodeName === 'P' ||
      event?.target?.nodeName === 'IMG' ||
      event?.target?.nodeName === 'path' ||
      event?.target?.dataset.testid === 'ExpandMoreIcon'
    ) {
      setIsInto(true);
      setIdAccount(id);
      dispatch(getSwitchAccount(id));
      dispatch(getChats());
      setPageNumber(1);
      setHasMoreChats(1)
    }
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

  const onSubmit = async (formDataParam) => {
    // const formData = {};
    // const numberPhoneValue = `${extensionNumber}${numberPhone}`;
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

  const handleShowMoreMessages = () => {
    const pageNumberCounter = pageNumber + 1;
    setPageNumber(pageNumberCounter);
    dispatch(getMoreMessages(thread, pageNumberCounter));
  };

  const loadChats = async () => {
    const resp = await dispatch(getChats());
    if (resp) {
      setChatsAccount(resp?.data?.data?.data);
      setHasMoreChats(resp?.data?.data?.last_page)
    }
  };
  const loadMoreChats = async () => {
    const pageNumberCounter = pageNumber + 1;
    setPageNumber(pageNumberCounter);
    const response = await dispatch(getMoreChats(pageNumberCounter));
    if (response && response.data) {
      setChatsAccount((prevChats) => [...prevChats, ...response?.data?.data?.data]);
      setHasMoreChats(response?.data?.data?.last_page)
    } else {
      toast.error(t('error'));
    }
  };

  useEffect(() => {
    loadChats();
  }, [idAccount, isInto, changeAccount]);

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <Typography
          variant='h1'
          component='h6'
          sx={{ textAlign: 'center', ml: 10, mt: 1 }}
          display='flex'
        >
          <img src='/images/vivechat.png' width='75px' alt='' />
        </Typography>
        <Typography>{t('conversations')}</Typography>
        {phoneAccounts &&
          phoneAccounts?.map((account, index) => (
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
                  <img src='/images/ViveTel.png' width='40px' alt='' />
                ) : account?.name === 'ViveCanada Edu Services LTD' ? (
                  <img src='/images/ViveCanada.png' width='40px' alt='' />
                ) : account?.name === 'Test Number' ? (
                  <img src='/images/labores.png' width='40px' alt='' />
                ) : (
                  ''
                )}
                <Typography sx={{ m: 1 }}>
                  {account?.name === 'ViveCanada Edu Services LTD' ? 'ViveCanada' : account.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  paddingBottom: '8px',
                  px: 0,
                  overflow: 'auto',
                  maxHeight: '500px',
                }}
              >
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
                          sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}
                          onClick={(event) => {
                            event.stopPropagation();
                            navigateTo(`/chat/${item.number}/${item.id}/${item.name}`),
                              localStorage.setItem('chat_account_type', account?.name);
                          }}
                        >
                          <Grid sx={{ display: 'flex' }}>
                            <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
                              <Typography>{item.name && `${item?.name}`}</Typography>
                              <Typography>{`${item?.number} `}</Typography>
                            </Grid>
                          </Grid>
                          {item?.unread > 0 ? <AdjustIcon /> : ''}
                        </Button>
                      </>
                    </Grid>
                  ))}
              </AccordionDetails>
              {pageNumber < hasMoreChats &&
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
              }
            </Accordion>
          ))}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography sx={{ m: 1 }}>{t('users')}</Typography>
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
                Users
              </Button>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </List>
      {/* <PhoneModal
        open={openModalForm}
        onClose={setOpenModalForm}
        onSubmit={onSubmit}
        title={t(`add_chat`)}
        setExtensionNumber={setExtensionNumber}
        setNumberPhone={setNumberPhone}
        setMessage={setMessage}
      /> */}
    </Drawer>
  );
}
