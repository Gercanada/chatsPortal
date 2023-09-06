import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import {
  setCategoriesColors,
  setChats,
  setLoading,
  setOneChat,
  setPhoneAccounts,
  setUserFiles,
} from './whatsAppSlice';

export const sendMessage = (recipient, message) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const dataForPost = {
        recipient: recipient,
        body: message,
      };
      const config = {
        method: 'post',
        url: 'whatsapp/messages',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: dataForPost,
      };

      const res = await immcaseApi(config);
      if (res) {
        //  dispatch(setLoading(false));
        return res?.status;
      }
    } catch (error) {
      return error;
    }
    // dispatch(setLoading(false));
  };
};

export const getChats = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get('/whatsapp/threads');
      await dispatch(setChats(resp?.data?.data));
      if (resp) {
        dispatch(setLoading(false));
        return resp;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    dispatch(setLoading(false));
  };
};

export const getUserChat = (phone) => {
  return async (dispatch) => {
    //dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/messages?contact=${phone}`);
      await dispatch(setOneChat(resp.data.data.data));
      if (resp) {
        // dispatch(setLoading(false));
        return resp.data.data.data;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    // dispatch(setLoading(false));
  };
};

export const getPhoneAccounts = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/accounts`);
      await dispatch(setPhoneAccounts(resp.data.data));

      if (resp) {
        dispatch(setLoading(false));
        return resp.status;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    dispatch(setLoading(false));
  };
};
export const getCategoriesColors = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/threads/categories`);
      await dispatch(setCategoriesColors(resp.data.data));

      if (resp) {
        dispatch(setLoading(false));
        return resp.status;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    dispatch(setLoading(false));
  };
};

export const getUserFiles = (thread) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/messages/files?thread_id=${thread}`);
      await dispatch(setUserFiles(resp.data.files));

      if (resp) {
        dispatch(setLoading(false));
        return resp.status;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    dispatch(setLoading(false));
  };
};

export const getSwitchAccount = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/switch_account/${id}`);

      if (resp) {
        dispatch(setLoading(false));
        return resp.status;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    dispatch(setLoading(false));
  };
};

export const setReadMessages = (ids) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const data = { messages: ids };
      const config = {
        method: 'post',
        url: '/whatsapp/messages/mark_as_read',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      const res = await immcaseApi(config);
      if (res) {
        //  dispatch(setLoading(false));
        return res?.status;
      }
    } catch (error) {
      return error;
    }
    // dispatch(setLoading(false));
  };
};

export const updateCategoryColor = (idUser, categoryId) => {
  //alert('HOLA');
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let dataForPost = {
        id: idUser,
        category_id: categoryId,
      };
      const config = {
        method: 'put',
        url: `/whatsapp/threads/${idUser}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: dataForPost,
      };

      const res = await immcaseApi(config);
      if (res) {
        dispatch(setLoading(false));
        return res.status;
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getMoreMessages = (id, page) => {
  return async (dispatch) => {
    //dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/messages?page=${page}&thread_id=${id}`);
      await dispatch(setOneChat(resp.data.data));
      if (resp) {
        //dispatch(setLoading(false));
        return resp.data.data.data;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    //dispatch(setLoading(false));
  };
};
export const getMoreChats = (page) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/threads?page=${page}`);
      await dispatch(setChats(resp?.data?.data));
      if (resp) {
        //dispatch(setLoading(false));
        return resp;
      }
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
