import { createSlice } from '@reduxjs/toolkit';

const getInitialLightTheme = () => {
  if (localStorage.getItem('isLightTheme')) {
    if (localStorage.getItem('isLightTheme')) {
      return localStorage.getItem('isLightTheme') === 'yes';
    }
    return false;
  } else {
    localStorage.setItem('isLightTheme', 'yes');
    return true;
  }
};

const initialState = {
  loading: false,
  menuOpen: false,
  isLightTheme: getInitialLightTheme(),
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    toggleTheme: (state) => {
      state.isLightTheme = !state.isLightTheme;
      localStorage.setItem('isLightTheme', state.isLightTheme ? 'yes' : 'no');
    },
    activeLightTheme: (state) => {
      state.isLightTheme = true;
      localStorage.setItem('isLightTheme', 'yes');
    },
    activeDarkTheme: (state) => {
      state.isLightTheme = false;
      localStorage.setItem('isLightTheme', 'no');
    },
  },
});

export const { setLoading, toggleMenu, toggleTheme, activeLightTheme, activeDarkTheme } =
  uiSlice.actions;
