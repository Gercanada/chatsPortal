import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chats:[], 
  onechat:[],
  phoneAccounts:[],
  userFiles:[],
  categoriesColors:[]
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
      },
    setPhoneAccounts:(state, {payload}) => {
        state.phoneAccounts = payload;
     },
     setUserFiles:(state, {payload}) => {
      state.userFiles = payload;
   },
   setCategoriesColors:(state, {payload}) => {
    state.categoriesColors = payload;
 },
  }
});

export const {setLoading, setChats,setOneChat,setPhoneAccounts, setUserFiles, setCategoriesColors } =
whatsAppSlice.actions;
