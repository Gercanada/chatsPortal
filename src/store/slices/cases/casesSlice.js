import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  checklistForDetails: {},
};

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCasesForDetails: (state, { payload }) => {
      state.casesForDetails = payload;
    },
  },
});

export const { setLoading, setCasesForDetails } = casesSlice.actions;
