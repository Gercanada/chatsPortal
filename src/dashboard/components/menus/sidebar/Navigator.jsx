import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
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
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { logout } from '../../../../store/slices/auth';
import { clearLocalStorage } from '../../../../functions/localStorageUtil';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
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
      id: t('submenu_cases'),
      children: [
        {
          id: 'submenu_cases',
          icon: <PersonAddIcon />,
          url: '/cases',
        },
      ],
    },
    {
      id: t('submenu_checklist'),
      children: [{ id: 'submenu_checklist', icon: <PlaylistAddCheckIcon />, url: '/checklist' }],
    },
  ];

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem sx={{ ...itemCategory, fontSize: 22, color: '#fff', pt: 1, pb: 1 }}>
          <Typography variant='h6' component='h6' display='flex'>
            <img src='/images/LOGOPORTAL.png' width='200px' alt='' />
          </Typography>
        </ListItem>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem sx={{ py: 2, px: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <Accordion  defaultExpanded sx={{boxShadow:'0', background: 'inherit'}} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{id}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{paddingBottom:'8px',px: 0}}>
                {children.map(({ id: childId, icon, active, url }) => (
                  <Link key={id} to={url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem  disablePadding key={childId} onClick={() => navigateTo(url)}>
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
