import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import { clearLocalStorage } from '../../../functions/localStorageUtil';
import { login, logout } from './authSlice';

export const startLogin = ({ user_name, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await immcaseApi.post('/login', {
        user_name,
        password,
      });

      const { user, token } = data;

      localStorage.setItem('x-token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(login(user));
    } catch (error) {
      return "error"
    }
  };
};

export const verificarToken = () => {
  console.log('verificar...');

  return async (dispatch) => {
    const config = {
      method: 'get',
      url: '/token',
    };
    const verify = await immcaseApi(config);
    const verified = verify?.data;
    const token = localStorage.getItem('x-token');
    if (!token || !verified) {
      clearLocalStorage();
      dispatch(logout());
      return false;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      clearLocalStorage();
      dispatch(logout());
      return false;
    }

    dispatch(login(JSON.parse(user)));
    return true;
  };
};

export const setDefaultLang = (payload) => {
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && data2.append(key, val);
      });

      const config = {
        method: 'post',
        url: '/resource/users/set_lang',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data2,
      };
      const res = await immcaseApi(config);
      if (res) {
        toast.success('Language changed');
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Invalid form data');
      if (error.response.data.errors.length > 1) {
        error.response.data.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }
  };
};
