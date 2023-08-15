import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import { setChats, setLoading, setOneChat } from './whatsAppSlice';

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
          url: 'send_text',
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
        const resp = await immcaseApi.get('/threads');
        await dispatch(setChats(resp.data.data));
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
        const resp = await immcaseApi.get(`/messages?contact=${phone}`);
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