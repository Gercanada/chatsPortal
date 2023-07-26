
import * as FormData from 'form-data';
import { toast } from 'react-toastify';
import { immcaseApi } from '../../../../api';
import { setCasesToShow, setLoading } from './immvisasCasesSlice';


export const getCasesTabs = ( id,path) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/cases/${id}/${path}`);
     //console.log('datas',data);
       await dispatch(setCasesToShow(data))
        return data;
      } catch (error) {
        console.error(error);
      }finally{
        dispatch(setLoading(false));
      }
    };
  };