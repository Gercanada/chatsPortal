import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import {
  setCategoriesColors,
  setChats,
  setCurrentPage,
  setLastPage,
  setLoading,
  setLoadingAccount,
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
   // dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get('/whatsapp/threads');
      console.log("resp?.data?.data?.last_page",resp?.data)
      await dispatch(setLastPage(resp?.data?.data?.last_page))
      await dispatch(setCurrentPage(resp?.data?.data?.current_page))
      await dispatch(setChats(resp?.data?.data?.data));
      localStorage.setItem('chats', JSON.stringify(resp?.data?.data?.data));
      if (resp) {
        dispatch(setLoading(false));
        return resp;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
   // dispatch(setLoading(false));
  };
};
export const getMoreChats = (page, prefix) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log("page",page)
      const chats = await localStorage.getItem('chats');
      const chatsCached = JSON.parse(chats);
      const resp = await immcaseApi.get(`/whatsapp/threads?page=${page}`);
    dispatch(setLastPage(resp?.data?.data?.last_page))
       dispatch(setCurrentPage(resp?.data?.data?.current_page))
      console.log('respukiuiiiiiiiiiiiiiii',resp?.data?.data)
      const newChats = resp?.data?.data?.data;
      const combinedChats = chatsCached.concat(newChats);
      localStorage.setItem('chats', JSON.stringify(combinedChats));
      await dispatch(setChats(combinedChats));
      return
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const getUserChat = (phone) => {
  return async (dispatch) => {
    //dispatch(setLoading(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/messages?thread_id=${phone}`);
      await dispatch(setOneChat(resp.data.data.data));
      if (resp) {
        // dispatch(setLoading(false));
        return resp;
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
      localStorage.setItem(`phoneAccounts_`, JSON.stringify(resp.data.data));

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

export const getContactThread = (thread) => {
  return async (dispatch) => {
    try {
      const resp = await immcaseApi.get(`/whatsapp/threads?search[number]=${thread}`);
      if (resp) {
        return resp.data;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };
};

export const getSwitchAccount = (id) => {
  return async (dispatch) => {
    dispatch(setLoadingAccount(true));
    try {
      const resp = await immcaseApi.get(`/whatsapp/switch_account/${id}`);

      if (resp) {
        dispatch(setLoadingAccount(false));
        return resp.status;
      }
    } catch (error) {
      console.error(error);
      return error;
    }finally{
      dispatch(setLoadingAccount(false));
    }
  };
};

export const setReadMessages = (id) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      // const data = { messages: id };
      const config = {
        method: 'post',
        url: `/whatsapp/messages/mark_as_read/${id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // data: data,
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

export const sendFiles = (number, file) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const data = { recipient: number, file: file };
      const config = {
        method: 'post',
        url: '/whatsapp/messages',
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
        return resp;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    //dispatch(setLoading(false));
  };
};


export const updateContactNameThread = (idUser, name) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let dataForPost = {
        id: parseInt(idUser),
        name: name,
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
