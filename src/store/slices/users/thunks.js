import { immcaseApi } from '../../../api';
import {
  setLoading,
  setRoles,
  setUserForEdit,
  setUserForDetails,
  setZones,
  setUsersList,
  setUserDetails,
  setUser,
  // setUsers,
} from './usersSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

export const createUser = ( payload ) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log('payload',payload)
      let dataForPost = {};
    Object.entries(payload).forEach(([key, val]) => {
      dataForPost = {
        ...dataForPost,
        [key]: val
      };
    });

      const config = {
        method: 'post',
        url: 'users',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: dataForPost,
      };

      const res = await immcaseApi(config);
      if (res) {
        console.log('re,ress',res)
        dispatch(setLoading(false));
        return res.status
      }
    } catch (error) {
     return error
    }
    dispatch(setLoading(false));
  };
};

export const updateUser = ({ idUser, payload }) => {
  //alert('HOLA');
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log('payload',payload)
      let dataForPost = {};
    Object.entries(payload).forEach(([key, val]) => {
      dataForPost = {
        ...dataForPost,
        [key]: val
      };
    });
      const config = {
        method: 'post',
        url: `users/${idUser}/update`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: dataForPost,
      };

      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
        dispatch(setLoading(false));
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/roles/select');
      await dispatch(setRoles(data?.roles));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

/* export const getUsers = () => {
  //TODO Delete this method ()
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/users/select');
      await dispatch(setUsers(data?.users));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
}; */

export const getUsersList = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/users/select`);
      await dispatch(setUsersList(data.users));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getZone = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/timezones/select');
      await dispatch(setZones(data?.timezones));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`users/${id}`);
      await dispatch(setUser( data ));
      return data
    } catch (error) {
      console.error(error);
      return error
    }finally{
      dispatch(setLoading(false));
    }
  
  };
};

export const updateDefaultTheme = ({ theme }) => {
  return async (dispatch) => {
    try {
      const data = {
        'default_theme': theme
      }

      const config = {
        method: 'post',
        url: `user/account`,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      };
      await immcaseApi(config);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateDefaultLanguage = ({ language }) => {
  return async (dispatch) => {
    try {
      const data = new FormData();
      data.append('default_language', language);

      const config = {
        method: 'post',
        url: `resource/users/account`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      };
      await immcaseApi(config);
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch) => {
     dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${id}/tickets`);
      await dispatch(setUserDetails(data));
      return data;
      
    } catch (error) {
      console.error(error);
    }
     dispatch(setLoading(false));
  };
};
