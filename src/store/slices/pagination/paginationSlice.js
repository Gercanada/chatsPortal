import { createSlice } from '@reduxjs/toolkit';

const initialState = {
pagination: [],
loading: false,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagination: (state, { payload }) => {
            state.pagination = payload;
          },
        setLoading: (state, { payload }) => {
          state.loading = payload;
        },
    }
});
export const {
    setPagination,
    setLoading,
} = paginationSlice.actions;