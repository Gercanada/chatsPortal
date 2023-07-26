import { immcaseApi } from '../../../api';

import { setCounterInfo } from './navBarSlice';

export const getCounterInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${id}/counts`);
      dispatch(setCounterInfo(data));
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

