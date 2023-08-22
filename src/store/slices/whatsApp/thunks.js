import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import { setChats, setLoading, setOneChat, setPhoneAccounts } from './whatsAppSlice';

export const sendMessage = ( recipient,message) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const dataForPost = {
            'recipient':recipient,
            'body':message
        }
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
          dispatch(setLoading(false));
          return res?.status;
        }
      } catch (error) {
       return error
      }
      dispatch(setLoading(false));
    };
  };

  export const getChats = () => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const resp = await immcaseApi.get('/whatsapp/threads');
        console.log('aqui toy chatsereeeeeee-----------------',resp?.data?.data)
        await dispatch(setChats(resp?.data?.data));
        if (resp) {
            dispatch(setLoading(false));
            return resp.status;
          }
      } catch (error) {
        console.error(error);
        return error
      }
      dispatch(setLoading(false));
    };
  };

  export const getUserChat = (phone) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const resp = await immcaseApi.get(`/whatsapp/messages?contact=${phone}`);
        await dispatch(setOneChat(resp.data.data))
       
        if (resp) {
            dispatch(setLoading(false));
            return resp.status;
          }
      } catch (error) {
        console.error(error);
        return error
      }
      dispatch(setLoading(false));
    };
  };

  export const getPhoneAccounts = () => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const resp = await immcaseApi.get(`/whatsapp/accounts`);
        await dispatch(setPhoneAccounts(resp.data.data))
       
        if (resp) {
            dispatch(setLoading(false));
            return resp.status;
          }
      } catch (error) {
        console.error(error);
        return error
      }
      dispatch(setLoading(false));
    };
  };

  export const getSwitchAccount = (id) => {
    console.log("ididididididididid",id)
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
        return error
      }
      dispatch(setLoading(false));
    };
  };

  export const setReadMessages = (ids) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
   const data = {'messages':ids}
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
          dispatch(setLoading(false));
          return res?.status;
        }
      } catch (error) {
       return error
      }
      dispatch(setLoading(false));
    };
  };