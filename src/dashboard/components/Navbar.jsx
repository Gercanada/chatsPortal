import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardHeader,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/auth';
import { activeDarkTheme, activeLightTheme, toggleMenu, toggleTheme } from '../../store/slices/ui';
import MaterialUISwitch from './SwitchCustom';
import LanguageSelect from '../../locale/LanguageSelect';
import { SearchBar } from '../../components/search/SearchBar';
import { useEffect, useState } from 'react';
import { clearLocalStorage } from '../../functions/localStorageUtil';
import { useFetchApi } from '../hooks';
import { useTranslation } from 'react-i18next';
import { getUser, updateDefaultTheme } from '../../store/slices/users';
import { getApiDashBoardDetails } from '../../store/slices/dashboard/thunks';

export const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onToggleMenu = () => dispatch(toggleMenu());
  const onToggleTheme = () => dispatch(toggleTheme());
  const navigate = useNavigate();

  const { isLightTheme,loading } = useSelector((state) => state.ui);
  const {userDetails}= useSelector((state)=>state.users)

  const [firstName, setFirstName] = useState(userDetails?.contact?.first_name);
  const [lastName, setLastName] = useState(userDetails?.contact?.last_name);
  const [userName, setUserName] = useState(userDetails?.contact?.username);
  const [responseUser, setResponseUser] = useState(userDetails);
  const [theme, setTheme] = useState();
  const [language, setLanguage] = useState(userDetails?.contact?.default_language);
  const navigateTo = (url) => {
    navigate(url);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
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
    if(e.target.checked === true){
      dispatch(updateDefaultTheme({ theme: 'dark' }));
    }else{
      dispatch(updateDefaultTheme({ theme: 'light' }))
    }
    onToggleTheme();
  };

  const getShowData = () => {
    if (userDetails) {
      setResponseUser(userDetails)
      setFirstName(userDetails?.contact?.first_name)
      setLastName(userDetails?.contact?.last_name)
      setUserName(userDetails?.contact?.username)
      setLanguage(userDetails?.contact?.default_language)
      setTheme(userDetails?.contact?.default_theme)
      
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
    dispatch(getUser())
    defaultTools();
  }, []);

  useEffect(() => {
    getShowData();
  }, [userDetails,theme]);


  return (
    <AppBar sx={{ boxShadow: '0 0 1em 0 #979797' }}>
      <Toolbar>
        <Button onClick={onToggleMenu}>
          <i className='bx bx-menu' style={{ fontSize: 30 }}></i>
        </Button>

        <Link component={RouterLink} to='/'>
          <Typography variant='h6' component='h6' display='flex'>
            <img src='/images/LOGOPORTAL.png' width='200px' alt='' />
          </Typography>
        </Link>

        <Box flex={1} />
        {/* <SearchBar /> */}
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
        <LanguageSelect user={responseUser} />

        <Box sx={{ flexGrow: 0, paddingLeft: '4pt' }}>
          <>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='user_photo' src={ ''} />
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
                      // src={response?.avatar || ''}
                    ></Avatar>
                  }
                  title={!loading ? firstName+ ' ' + lastName : 'user name'}
                  subheader={
                    <>
                      <Typography textAlign=''> {`${userName}`|| ''} </Typography>
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
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
