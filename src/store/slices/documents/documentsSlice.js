import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  pdfTemplates: [],
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setPdfTemplates: (state, { payload }) => {
      state.pdfTemplates = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setPdfTemplates, setLoading } = documentsSlice.actions;
