import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
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
  getChats,
  getPhoneAccounts,
  getSwitchAccount,
} from '../../../../store/slices/whatsApp/thunks';
import AdjustIcon from '@mui/icons-material/Adjust';

export const data = {
  data: [
    {
      id: 2,
      avatar: null,
      username: 'heriberto',
      name: 'Heriberto',
      last_name: 'Hernandez',
      email: 'heriberto.h@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 8,
      avatar: null,
      username: 'pablo_s',
      name: 'Pablo',
      last_name: 'Sainz',
      email: 'pablo.s@immcase.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 9,
      avatar: null,
      username: 'amy_m',
      name: 'Amy',
      last_name: 'Martinez',
      email: 'amy.m@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 10,
      avatar: null,
      username: 'cecilia_v',
      name: 'Cecilia',
      last_name: 'Verduzco',
      email: 'cecilia.v@laborem.ca',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 12,
      avatar: null,
      username: 'josue_r',
      name: 'Josue',
      last_name: 'Rocha',
      email: 'josue.r@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 13,
      avatar: '/documents/users/26072023_143800.png',
      username: 'lizeth_r',
      name: 'Lizeth Anahi',
      last_name: 'Ramirez Rodriguez',
      email: 'lizeth.r@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
    {
      id: 14,
      avatar: null,
      username: 'mayja_m',
      name: 'Mayja',
      last_name: 'Madrid',
      email: 'mayja.m@gercanada.com',
      active: 1,
      role_id: {
        id: 2,
        value: 'Agent',
      },
    },
  ],
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const [contactId, setContactId] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLightTheme } = useSelector((state) => state.ui);

  const [openModal, setOpenModal] = useState(false);
  const [selectsQuickCreate, setSelectsQuickCreate] = useState(new Map());
  const [openModalForm, setOpenModalForm] = useState(false);
  const [extensionNumber, setExtensionNumber] = useState(0);
  const [numberPhone, setNumberPhone] = useState(0);
  const [message, setMessage] = useState('');
  const [idAccount, setIdAccount] = useState(0);
  const { chats, loading, phoneAccounts } = useSelector((state) => state.whatsApp);
  const [expanded, setExpanded] = React.useState(false);

  console.log("chats",chats)

  const handleLogout = () => {
    dispatch(logout());
    clearLocalStorage();
  };
  const navigateTo = (url) => {
    navigate(url);
  };

  const handleOpenModal = () => {
    setOpenModalForm(true);
  };
  const handleCloseModal = () => {
    setOpenModalForm(false);
  };

  const handleAccount = (id) => {
    setIdAccount(id);
    dispatch(getSwitchAccount(id));
    dispatch(getChats());
  };

  const categories = [
    {
      id: t('conversations'),
      children: [
        {
          id: 'chats',
          icon: <ForumIcon />,
          url: '/cases',
          openModal: handleCloseModal,
        },
        //  { id: 'new_conversation', icon: <AddCommentIcon />, url: '/checklist',openModal:handleOpenModal },
      ],
    },
  ];

  useEffect(() => {
    dispatch(getChats());
  }, [idAccount]);

  useEffect(() => {
    dispatch(getPhoneAccounts());
  }, []);

  const onSubmit = async (formDataParam) => {
    const formData = {};
    const numberPhoneValue = `${extensionNumber}${numberPhone}`;
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        {/* <ListItem sx={{ ...itemCategory, fontSize: 22, color: '#fff', pt: 1, pb: 1 }}> */}
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
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{ boxShadow: '0', background: 'inherit' }}
              onClick={() => {
                handleAccount(account?.id);
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                {account?.name === 'Iphone chino' ? (
                  <img src='/images/ViveTel.png' width='40px' alt='' />
                ) : account?.name === 'Vive Wha' ? (
                  <img src='/images/ViveCanada.png' width='40px' alt='' />
                ) : account?.name === 'Test Number' ? (
                  <img src='/images/labores.png' width='40px' alt='' />
                ) : (
                  ''
                )}
                <Typography sx={{ m: 1 }}>{account.name}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingBottom: '8px', px: 0 }}>
                {chats &&
                  chats?.map((item, index) => (
                    <Grid
                      sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', mb: 1 }}
                      key={index}
                    >
                      <Button
                        name={item.number}
                        id={index}
                        sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}
                        onClick={() => {
                          navigateTo(`/chat/${item.number}/${item.id}/${item.name}`),
                            localStorage.setItem('chat_account_type', account?.name);
                        }}
                      >
                        <Grid sx={{ display: 'flex' }}>
                          <Avatar alt='user_photo' src={''} />
                          <Grid display={'flex'} sx={{ flexDirection: 'column' }}>
                            <Typography>{item.name && `${item?.name}`}</Typography>
                            <Typography>{`${item?.number} `}</Typography>
                          </Grid>
                        </Grid>
                        {item?.unread > 0 ? <AdjustIcon /> : ''}
                      </Button>
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
            <Grid
              sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', mb: 1 }}
            >
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
