import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import SimpleModal from '../Modal/SimpleModal';
import { Box, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchResult } from '../../store/slices/modalSearch/thunks';
import './Search.css';
import { useNavigate } from 'react-router-dom';

const isDark = (theme) => theme.palette.mode === 'dark';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(isDark(theme) ? '#F3F6F9' : '#808080', 0.15),
  '&:hover': {
    backgroundColor: alpha(isDark(theme) ? '#F3F6F9' : '#808080', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: isDark(theme) ? 'white' : 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchBar = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, result } = useSelector((state) => state.modalSearch);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  const callBackend = async () => {
    await dispatch(getSearchResult(displayMessage));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    callBackend();
  }, [displayMessage]);

  const openSeachModal = (value) => {
    setQuery(value);
    setModal(true);
  };

  const goToModule = (data, title) => {
    setModal(false);

    switch (title) {
      case 'contacts':
        navigate(`/admin/contacts/${data?.id}`);
        break;
      case 'cases':
        navigate(`/immigration/cases/${data?.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon style={{ color: isLightTheme ? 'gray' : 'white' }} />
        </SearchIconWrapper>
        {isMobile ? (
          <StyledInputBase
            placeholder={`${t('text_seach')}...`}
            inputProps={{ 'aria-label': 'search' }}
            onClick={(e) => openSeachModal('')}
          />
        ) : (
          <StyledInputBase
            placeholder={`${t('text_seach')}...`}
            inputProps={{ 'aria-label': 'search' }}
            onKeyUp={(e) => openSeachModal(e.target.value)}
          />
        )}
      </Search> */}
      <SimpleModal open={modal} setOpen={setModal}>
        <Box style={{ textAlign: 'center' }}>
          <TextField
            autoFocus
            id='modalInputSearch'
            type='search'
            placeholder={`${t('text_seach')}...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Box>
        <br />
        <br />
        <Box style={{ maxHeight: 500, overflowY: 'scroll' }}>
          {loading ? (
            <Box style={{ textAlign: 'center' }}>
              <h4>{`${t('serching_in_database')}...`}</h4>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {Object.keys(result).map((title, key) => (
                <table id='search-result-table' key={`${key}-${title}`}>
                  <thead>
                    <tr id='search-result-table-title'>
                      <th colSpan={getColumnsSize(result[title])}>{t(title)}</th>
                    </tr>
                    <tr>{getColumns(result[title], t, isLightTheme)}</tr>
                  </thead>
                  <tbody style={isLightTheme ? {} : { backgroundColor: '#c5c5c5', color: 'black' }}>
                    {getRows(result[title], isLightTheme, goToModule, title)}
                  </tbody>
                </table>
              ))}
            </>
          )}
        </Box>
      </SimpleModal>
    </>
  );
};

const getColumnsSize = (data) => {
  try {
    const item = data[0];
    return Object.keys(item).length;
  } catch (error) {
    return 0;
  }
};

const getColumns = (data, t, isLightTheme) => {
  try {
    const item = data[0];
    return Object.keys(item).map((i, key) => (
      <th
        className={`search-result-table-th-${isLightTheme ? 'light' : 'dark'}`}
        key={`${i}-${key}`}
      >
        {t(i)}
      </th>
    ));
  } catch (error) {
    return (
      <th className={`search-result-table-th-${isLightTheme ? 'light' : 'dark'}`}>
        <small>{t('no_results')}</small>
      </th>
    );
  }
};

const getRows = (data, isLightTheme, goToModule, title) => {
  try {
    return data.map((item, key) => {
      return (
        <tr
          className={`search-result-table-body-tr-${isLightTheme ? 'light' : 'dark'}`}
          key={key}
          style={{ cursor: 'pointer' }}
          onClick={() => goToModule(item, title)}
        >
          {Object.keys(item).map((item2, key2) => (
            <td key={`${key}-${key2}`}>{item[item2]}</td>
          ))}
        </tr>
      );
    });
  } catch (error) {
    return (
      <tr>
        <td>Row error</td>
      </tr>
    );
  }
};
