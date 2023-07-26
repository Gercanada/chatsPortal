import { immcaseApi } from '../../../api';
import { setItemsByItem, setLoading } from './itemsSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

export const getReturnItem = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/items/${id}`);
      dispatch(setItemsByItem(data.content))
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const createItem = ({ payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPost = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && val && dataForPost.append(key, val);
      });

      const config = {
        method: 'post',
        url: 'resource/items',
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

export const updateItem = ({ idItem, payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPut = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        val && val && dataForPut.append(key, val);
      });

      const config = {
        method: 'put',
        url: `resource/items/${idItem}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: dataForPut,
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
