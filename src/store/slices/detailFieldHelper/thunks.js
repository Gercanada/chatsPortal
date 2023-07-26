import { immcaseApi } from '../../../api';
import { setOptionsMap, setLoading } from './detailFieldHelperSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

export const getOptionsInDFHelper = ({ store_key, url }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(url);
      if (data[store_key]) {
        await dispatch(setOptionsMap({ key: store_key, data: data[store_key] }));
      } else if (data['statuses']) {
        await dispatch(setOptionsMap({ key: 'statuses', data: data['statuses'] }));
      } else {
        console.error(`NO SE ENCONTRO ${store_key} EN EL RESPONSE`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateSelectValue = ({ url_put_for_save, key, value, method }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = new FormData();
      data.append(key, value);
      const config = {
        method: 'put',
        url: `${url_put_for_save}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      };
      if (method === 'POST') {
        // alert('here go');
        config.method = 'post';
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }
      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateProfile = ({ url_put_for_save, key, value, method }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data2 = { [key]: value };
      const config = {
        method: 'post', //! When request has file, method requires be POST ?
        url: 'user/account', // ! Id id is undefined takes url , example : users/account
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data2),
      };
      const res = await immcaseApi(config);
      toast.success('Correcto!');
      return res;
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};
export const updateAvatar = ({ url_put_for_save, key, value, method }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data2 = { [key]: value };
      const config = {
        method: 'post', //! When request has file, method requires be POST ?
        url: 'user/account', // ! Id id is undefined takes url , example : users/account
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data2,
      };
      const res = await immcaseApi(config);
      toast.success('Correcto!');
      return res;
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

//export const updateContact = ({ idContact, payload }) => {
export const updateMultiSelectValue = ({ url_put_for_save, key, payload, method, idContact }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
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

export const updateSwitchValue = ({ url_put_for_save, key, value, method }) => {
  return async (dispatch) => {
    try {
      const data = new FormData();
      data.append(key, value);

      const config = {
        method: 'put',
        url: `${url_put_for_save}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      };

      if (method === 'POST') {
        // alert('here go');
        config.method = 'post';
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      }

      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
      }
    } catch (error) {
      console.error(error);
    }
  };
};
