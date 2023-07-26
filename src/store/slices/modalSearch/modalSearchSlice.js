import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  result: [],
};

export const modalSearchSlice = createSlice({
  name: 'modalSearch',
  initialState,
  reducers: {
    setResult: (state, { payload }) => {
      state.result = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setResult, setLoading } = modalSearchSlice.actions;
