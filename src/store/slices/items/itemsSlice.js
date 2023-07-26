import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  itemsDetails:[],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setItemsByItem: (state, { payload }) => {
      state.itemsDetails = payload;
    },
  },
});

export const { setLoading,setItemsByItem } = itemsSlice.actions;
