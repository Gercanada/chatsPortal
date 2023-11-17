import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  loadingAccount: false,
  lastPage:0,
  currentPage:0,
  chats:[], 
  onechat:[],
  phoneAccounts:[],
  userFiles:[],
  templatesOptions:[],
  categoriesColors:[]
};

export const whatsAppSlice = createSlice({
  name: 'whatsApp',
  initialState,
  reducers: {

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setLastPage: (state, { payload }) => {
      state.lastPage = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setLoadingAccount: (state, { payload }) => {
      state.loadingAccount = payload;
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
 setTemplatesOptions:(state, {payload}) => {
  state.templatesOptions = payload;
},
  }
});

export const {setLoading,setLoadingAccount, setChats,setOneChat,setPhoneAccounts, setUserFiles, setCategoriesColors,setLastPage,setCurrentPage,setTemplatesOptions} =
whatsAppSlice.actions;
