import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categoryLabel: [],
};

export const picklistSlice = createSlice({
  name: 'picklist',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCategoryLabel: (state, { payload }) => {
      state.categoryLabel = payload;
    },
  },
});

export const { setLoading, setCategoryLabel } = picklistSlice.actions;
