import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  username: '',
  email: '',
  is_admin: 0,
  is_owner: 0,
  department: '',
  avatar: '',
  status: 'checking', // autenticated not-authenticated
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      // state.is_admin = payload.is_admin;
      state.is_owner = payload.is_owner;
      state.department = payload.department;
      state.avatar = payload.avatar;
      state.status = 'authenticated';
    },
    logout: (state) => {
      state.id = undefined;
      state.username = undefined;
      state.email = undefined;
      state.is_owner = undefined;
      state.department = undefined;
      state.avatar = undefined;
      state.status = 'not-authenticated';
    },
    checkCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkCredentials } = authSlice.actions;
