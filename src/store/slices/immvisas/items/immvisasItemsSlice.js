import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  itemsDetails:[],
};

export const immvisasItemsSlice = createSlice({
  name: 'immvisasItems',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

  },
});

export const { setLoading} = immvisasItemsSlice.actions;