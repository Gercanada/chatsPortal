import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [],
  roles: [],
  timeZones: [],
  userForEdit: {},
  userForDetails: {},
  usersDetails:[],
  userDetails:[],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /*  setUsers: (state, { payload }) => {
      state.users = payload;
    }, */
    setUsersList: (state, { payload }) => {
      state.usersList = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setRoles: (state, { payload }) => {
      state.roles = payload;
    },
    setUserForEdit: (state, { payload }) => {
      state.userForEdit = payload;
    },
    setUserForDetails: (state, { payload }) => {
      state.userForDetails = payload;
    },
    setZones: (state, { payload }) => {
      state.timeZones = payload;
    },
    setUserDetails:(state, {payload}) => {
      state.usersDetails = payload;
    },
    setUser:(state, {payload}) => {
      state.userDetails = payload;
    }
  }
});

export const { setUsersList, setUser,setLoading, setRoles, setUserForEdit, setUserForDetails, setZones,setUserDetails } =
  usersSlice.actions;
