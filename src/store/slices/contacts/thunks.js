import { immcaseApi } from '../../../api';

import {
  setLoading,
  setContactForDetails,
  setContactForEdit,
} from './contactsSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

export const createContact = ( payload ) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // const dataForPost = new FormData();
      // Object.entries(payload).forEach(([key, val]) => {
      //   val && val && dataForPost.append(key, val);
      // });

      const dataForPost = payload;
      console.log('daraaa',dataForPost);


      const config = {
        method: 'post',
        url: 'whatsapp/contacts',
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const updateContact = ({ idContact, payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
//      const dataForPost = new FormData();
//      Object.entries(payload).forEach(([key, val]) => {
 //       val && val && dataForPost.append(key, val);
 //     });
      const dataForPost = payload;
      const config = {
        method: 'post',
        url: `resource/clients/${idContact}/update`,
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

export const getContactById = ({ idContact }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${idContact}`);
      await dispatch(setContactForEdit(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getContactByIdDetails = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${parseInt(id)}`);
      await dispatch(setContactForDetails(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};







