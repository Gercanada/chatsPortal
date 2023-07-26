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

export const createUser = ({ payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPost = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && dataForPost.append(key, val);
      });

      const config = {
        method: 'post',
        url: 'resource/users',
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
      const errors = error.response.data;
      const valuesErrors = Object.values(errors);
      valuesErrors.map((item) => toast.error(item.toString()));
    }
    dispatch(setLoading(false));
  };
};

export const updateUser = ({ idUser, payload }) => {
  //alert('HOLA');
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
  //    const dataForPost = new FormData();
  //    Object.entries(payload).forEach(([key, val]) => {
  //      val && dataForPost.append(key, val);
  //    });
  
      const dataForPost = payload;
      const config = {
        method: 'post',
        url: `resource/users/${idUser}/update`,
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

export const getUser = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/user/account');
      await dispatch(setUser( data ));
      return data
    } catch (error) {
      console.error(error);
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
