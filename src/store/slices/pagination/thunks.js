import { immcaseApi } from '../../../api';

import {
  setLoading,
  setPagination,
} from './paginationSlice';
import { toast } from 'react-toastify';

export const getPagination = (path,prefix) => {
    return async (dispatch) => {
       dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`${path}`);
        await dispatch(setPagination(data));
        return data;
        
      } catch (error) {
        console.error(error);
      }finally {
        dispatch(setLoading(false));
      }
    };
  };