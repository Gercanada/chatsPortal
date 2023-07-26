import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  optionsMap: {},
};

export const detailFieldHelperSlice = createSlice({
  name: 'detailFieldHelper',
  initialState,
  reducers: {
    setOptionsMap: (state, { payload: { key, data } }) => {
      state.optionsMap[key] = data;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setOptionsMap, setLoading } = detailFieldHelperSlice.actions;
