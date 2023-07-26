import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counterInfo: []
}


export const navBarSlice = createSlice({
    name: 'counterInfo',
    initialState,
    reducers: {
      setCounterInfo: (state, { payload }) => {
        state.counterInfo = payload;
      },
    },
  });

  export const { setCounterInfo } = navBarSlice.actions;