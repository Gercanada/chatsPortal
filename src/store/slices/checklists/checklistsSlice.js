import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  checklistForDetails: {},
};

export const checklistsSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setChecklistForDetails: (state, { payload }) => {
      state.checklistForDetails = payload;
    },
  },
});

export const { setLoading, setChecklistForDetails } = checklistsSlice.actions;
