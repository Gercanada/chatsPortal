import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const immProfilesSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setLoading } = immProfilesSlice.actions;
