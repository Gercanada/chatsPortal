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
import { logout } from '../../../../store/slices/auth';
import { clearLocalStorage } from '../../../../functions/localStorageUtil';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopoverField from '../../../../components/Popovers/PopoverField';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ModalForm from '../../../../components/Modal/ModalForm';
import NewFormModal from '../../../../components/Modal/NewFormModal';
import { useState } from 'react';
import PhoneModal from '../../../../components/Modal/PhoneModal';
import { useEffect } from 'react';
import {
  getCategoriesColors,
  getChats,
  getPhoneAccounts,
  getSwitchAccount,
  updateCategoryColor,
} from '../../../../store/slices/whatsApp/thunks';
import AdjustIcon from '@mui/icons-material/Adjust';
import Circle from '../../../../components/forms/Circle';
import ColorMenu from '../../../../components/menus/ColorMenu';
import { toast } from 'react-toastify';
import { Loader } from '../../../../components/Loader';

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLightTheme } = useSelector((state) => state.ui);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [changedColor, setChangedColor] = useState(false);
  const [isInto, setIsInto] = useState(false);
  const [extensionNumber, setExtensionNumber] = useState(0);
  const [numberPhone, setNumberPhone] = useState(0);
  const [message, setMessage] = useState('');
  const [idAccount, setIdAccount] = useState(0);
  const { chats, loading, phoneAccounts, categoriesColors } = useSelector(
    (state) => state.whatsApp,
  );
  const [expanded, setExpanded] = React.useState(false);

  const navigateTo = (url) => {
    navigate(url);
  };

  const handleAccount = (id, event) => {
    if (event?.target?.nodeName === 'DIV' || event?.target?.nodeName === 'P' || event?.target?.nodeName === 'IMG') {
      setIsInto(true)
      setIdAccount(id);
      dispatch(getSwitchAccount(id));
      dispatch(getChats());
    }
  };

  const handleSetChatCategory = async (id, categoryId) => {
    const resp = await dispatch(updateCategoryColor(id, categoryId));
    if (resp === 200) {
      toast.success(t('saved'));
    setChangedColor(!changedColor)
    } else {
      toast.error(t('error'));
    }
  };

  const onSubmit = async (formDataParam) => {
    const formData = {};
    const numberPhoneValue = `${extensionNumber}${numberPhone}`;
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getChats());
    dispatch(getCategoriesColors());
  }, [idAccount,isInto,changedColor]);

  useEffect(() => {
    dispatch(getPhoneAccounts());
  }, []);

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
                  {account?.name === 'ViveCanada Edu Services LTD' ? 'ViveCanada':account.name}
                  </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingBottom: '8px', px: 0 }}>
                {chats &&
                  chats?.map((item, index) => (
                    <Grid sx={{ display: 'flex', flexDirection: 'row', mb: 1 }} key={index}>
                      {loading &&
                        <Loader />}
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
      <PhoneModal
        open={openModalForm}
        onClose={setOpenModalForm}
        onSubmit={onSubmit}
        title={t(`add_chat`)}
        setExtensionNumber={setExtensionNumber}
        setNumberPhone={setNumberPhone}
        setMessage={setMessage}
      />
    </Drawer>
  );
}
