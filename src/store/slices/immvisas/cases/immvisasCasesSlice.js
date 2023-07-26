import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  casesToShow:[]
};

export const immvisasCasesSlice = createSlice({
  name: 'immvisasCases',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },  
    setCasesToShow: (state, { payload }) => {
      state.casesToShow = payload;
    },

  },
});

export const { setLoading, setCasesToShow} = immvisasCasesSlice.actions;