import {
  Box,
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleMenu } from '../../store/slices/ui';
import { MenuIcon } from './MenuIcon';
import { SidebarItemDropdown } from './SidebarItemDropdown';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../store/slices/auth';
import { useTranslation } from 'react-i18next';
import { clearLocalStorage } from '../../functions/localStorageUtil';

const menu = [
  {
    menu_cases: [
      {
        icon: 'bx-user-plus',
        title_locale: 'submenu_cases',
        url: '/cases',
      },
      
    ],
  },
  {
    menu_checklist: [
      {
        icon: 'bx-user-plus',
        title_locale: 'submenu_checklist',
        url: '/checklist',
      },
      
    ],
  },
 
  

 
  
];

const dropdownIcons = (key) => {
  if (key === 'menu_education') return 'bxs-school';
  if (key === 'menu_cases') return 'bxs-briefcase-alt';
  if (key === 'menu_employment') return 'bxs-briefcase';
  if (key === 'menu_admin') return 'bxs-user';
  if (key === 'menu_tools') return 'bxs-cog';
  if (key === 'menu_checklist') return 'bxs-chalkboard';
  return 'bxs-plane-land';
};

export const Sidebar = () => {
  const { menuOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onToggleMenu = () => dispatch(toggleMenu());

  const navigateTo = (url) => {
    onToggleMenu();
    navigate(url);
  };

  const handleLogout = () => {
    dispatch(logout());
    clearLocalStorage();
  };

  const dropdowns = [];
  let e = 0;
  Object.values(menu).forEach((item) => {
    let i = 0;
    let newDropdown = {};
    Object.entries(item).forEach(([key, value]) => {
      const elements = [];
      Object.values(value).forEach((v) => {
        if (typeof v !== 'undefined') {
          elements.push(v);
        }
      });
      newDropdown = (
        <SidebarItemDropdown
          key={e + i}
          title={t(key)}
          // icon='bxl-flask'
          icon={dropdownIcons(key)}
          elements={elements}
          navigateTo={navigateTo}
        />
      );
      i += 2;
    });
    dropdowns.push(newDropdown);
    e += 1;
  });

  return (
    <Drawer
      open={menuOpen}
      anchor='left'
      sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
      onClose={onToggleMenu}
    >
      <Box sx={{ width: 250 }}>
        <List>
          <ListSubheader
            sx={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img style={{padding: '20px'}} src='/images/LOGOPORTAL.png' width='250px' alt='logo' />
          </ListSubheader>
          <Divider />
          <ListItemButton onClick={() => navigateTo('/')}>
            <ListItemIcon className='paddinAbajito'>
              <MenuIcon />
              <MenuIcon context={'bxs-dashboard'} />
            </ListItemIcon>
            <ListItemText primary={t('menu_dashboard')} />
          </ListItemButton>



          {dropdowns}
        </List>

        <ListItemButton
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',
            alignItems: 'end',
          }}
          onClick={handleLogout}
        >
          <Typography sx={{ letterSpacing: '4px', marginRight: '20px' }}>
            {t('menu_logout')}
          </Typography>
          <LogoutIcon></LogoutIcon>
        </ListItemButton>
      </Box>
    </Drawer>
  );
};
