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
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { logout } from '../../../../store/slices/auth';
import { clearLocalStorage } from '../../../../functions/localStorageUtil';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PopoverField from '../../../../components/Popovers/PopoverField';
import AddCommentIcon from '@mui/icons-material/AddComment';

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

  const handleLogout = () => {
    dispatch(logout());
    clearLocalStorage();
  };
  const navigateTo = (url) => {
    navigate(url);
  };

  const categories = [
    {
      id: t('conversations'),
      children: [ {
          id: 'chats',
          icon: <ForumIcon />,
          url: '/cases',
        },{ id: 'new_conversation', icon: <AddCommentIcon />, url: '/checklist' }],
    },
  ];

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        {/* <ListItem sx={{ ...itemCategory, fontSize: 22, color: '#fff', pt: 1, pb: 1 }}> */}
        <Typography variant='h1' component='h6' display='flex'>
          {/* <img src='/images/LOGOPORTAL.png' width='200px' alt='' /> */}
          ViveChatGPT no fake V5.0
        </Typography>
        {/* </ListItem> */}
        {/* <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}> */}
        <ListItem sx={{ py: 2, px: 0 }}>
          <Grid
            sx={{
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexFlow:'wrap',
              "&:hover": {
                background: 'rgba(0, 0, 0, 0.04)' 
              }
            }}
          >
            <ListItemIcon sx={{ml:1}}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <PopoverField setContactId={setContactId} values={data?.data} title={'Contacts'} />
            </ListItemText>
          </Grid>
        </ListItem>
        {/* </Link> */}
        {categories.map(({ id, children },index) => (
          <React.Fragment key={index}>
            <Accordion defaultExpanded sx={{ boxShadow: '0', background: 'inherit' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{id}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingBottom: '8px', px: 0 }}>
                {children.map(({ id: childId, icon, active, url }) => (
                  <Link key={`${index}-${childId}`} to={url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem disablePadding key={childId} onClick={() => navigateTo(url)}>
                      <ListItemButton selected={active}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{t(childId)}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}
