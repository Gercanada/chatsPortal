import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
import {

  setLoading,

  setCasesForDetails,
} from './casesSlice';

export const getCasesByIdDetails = (idCases) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/cases/${idCases}`);
      await dispatch(setCasesForDetails(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
