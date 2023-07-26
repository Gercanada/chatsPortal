import { immcaseApi } from '../../../api';
import { setResult, setLoading } from './modalSearchSlice';

export const getSearchResult = (displayMessage) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/search?q=${displayMessage}`);
      await dispatch(setResult(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
