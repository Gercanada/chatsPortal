import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  activeDarkTheme,
  activeLightTheme,
  toggleMenu,
  toggleTheme,
} from '../../../../store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../../../../store/slices/auth';
import { getUser, updateDefaultTheme } from '../../../../store/slices/users';
import { Card, CardHeader, FormControlLabel, FormGroup, Menu, MenuItem } from '@mui/material';
import LanguageSelect from '../../../../locale/LanguageSelect';
import MaterialUISwitch from '../../SwitchCustom';
import { clearLocalStorage } from '../../../../functions/localStorageUtil';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;


  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onToggleMenu = () => dispatch(toggleMenu());
  const onToggleTheme = () => dispatch(toggleTheme());
  const navigate = useNavigate();

  const { isLightTheme, loading } = useSelector((state) => state.ui);
  const { userDetails } = useSelector((state) => state.users);

  const [firstName, setFirstName] = useState(userDetails?.contact?.first_name);
  const [lastName, setLastName] = useState(userDetails?.contact?.last_name);
  const [userName, setUserName] = useState(userDetails?.contact?.username);
  const [responseUser, setResponseUser] = useState(userDetails);
  const [theme, setTheme] = useState();
  const [language, setLanguage] = useState(userDetails?.contact?.default_language);

  const [avatar, setAvatar] = useState(userDetails?.contact?.avatar);
  const navigateTo = (url) => {
    navigate(url);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    // console.log('evem',event)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    clearLocalStorage();
  };

  const handleOnToggleTheme = (e) => {
    if (e.target.checked === true) {
      dispatch(updateDefaultTheme({ theme: 'dark' }));
    } else {
      dispatch(updateDefaultTheme({ theme: 'light' }));
    }
    onToggleTheme();
  };

  const getShowData = () => {
    if (userDetails) {
      // alert(userDetails?.contact?.avatar);
      setResponseUser(userDetails);
      setFirstName(userDetails?.contact?.first_name);
      setLastName(userDetails?.contact?.last_name);
      setUserName(userDetails?.contact?.username);
      setLanguage(userDetails?.contact?.default_language);
      setTheme(userDetails?.contact?.default_theme);

      setAvatar(userDetails?.contact?.avatar);
    }
  };
  const defaultTools = async () => {
    if (theme === 'dark') {
      // el backend me devuelve dark cuando el theme es dark
      dispatch(activeDarkTheme());
    }
    if (theme === 'light') {
      // el backend me devuelve vacio cuando el theme es light
      dispatch(activeLightTheme());
    }
  };

  useEffect(() => {
    dispatch(getUser());
    defaultTools();
  }, []);

  React.useEffect(() => {
    getShowData();
  }, [userDetails, theme]);

  return (
    <React.Fragment>
      <AppBar position='sticky' elevation={0} sx={{ boxShadow: '0 0 1em 0 #979797' }}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            {/* <Link component={RouterLink} to='/'>
          <Typography variant='h6' component='h6' display='flex'>
            <img src='/images/LOGOPORTAL.png' width='200px' alt='' />
          </Typography>
            </Link> */}
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton aria-label='open drawer' onClick={onDrawerToggle} edge='start'>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      checked={!isLightTheme}
                      onChange={handleOnToggleTheme}
                    />
                  }
                />
              </FormGroup>
            </Grid>

            <LanguageSelect user={responseUser} />

            <Grid item>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='user_photo' src={avatar || ''} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ background: 'red' }}
                        aria-label='recipe'
                        src={avatar || ''}
                        // src={response?.avatar || ''}
                      ></Avatar>
                    }
                    title={!loading ? firstName + ' ' + lastName : 'user name'}
                    subheader={
                      <>
                        <Typography textAlign=''> {`${userName}` || ''} </Typography>
                        <Typography textAlign='' sx={{ color: 'info' }}>
                          {/* {response?.role_id?.value || ''} */}
                        </Typography>
                      </>
                    }
                  />
                </Card>
                <MenuItem
                  onClick={() => {
                    navigateTo(`/profile`);
                  }}
                >
                  <i className='bx bx-cog' />
                  <Typography textAlign='right'>{t('account_preferences')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <i className='bx bx-log-out-circle' />
                  <Typography textAlign='right'> {t('menu_logout')}</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
      {/* <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" />
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
