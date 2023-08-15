import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chats:[], 
  onechat:[]
};

export const whatsAppSlice = createSlice({
  name: 'whatsApp',
  initialState,
  reducers: {

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setChats:(state, {payload}) => {
      state.chats = payload;
    },
    setOneChat:(state, {payload}) => {
        state.onechat = payload;
      }
  }
});

export const {setLoading, setChats,setOneChat } =
whatsAppSlice.actions;
