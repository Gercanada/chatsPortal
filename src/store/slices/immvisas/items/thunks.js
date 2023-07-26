
import * as FormData from 'form-data';
import { toast } from 'react-toastify';
import { immcaseApi } from '../../../../api';
import { setLoading } from './immvisasItemsSlice'

export const createImmvisasItem = (payload,id ) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const config = {
          method: 'post',
          url:  `cl_items/44x${id}/upload-file`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: payload,
        };
        const res = await immcaseApi(config);
        if (res) {
          toast.success('Correcto!');
          dispatch(setLoading(false));
          return true;
        }
      } catch (error) {
        console.error(error);
      }finally{
        dispatch(setLoading(false));
      }

    };
  };

    export const deleteFileItem =  (id) => {
      return async (dispatch) => {
        dispatch(setLoading(true));
      try {
        const res = await immcaseApi.delete(`cl_items/${id}/drop_file`);
        toast.success('Eliminado!');
      } catch (error) {
        toast.error('Error!');
        console.error(error);
      }
      dispatch(setLoading(false));
    } 
    };
    
    export const sendFilesItem = (id) => {
      return async (dispatch) => {
        dispatch(setLoading(true));
        try {
          const config = {
            method: 'post',
            url:  `cl_items/${id}/send_file`,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          };
          const res = await immcaseApi(config);
          if (res) {
            toast.success('Correcto!');
            // dispatch(setLoading(false));
            return true;
          }
        } catch (error) {
          console.error(error);
        }finally{
        dispatch(setLoading(false));
        }
      };
    };
  
    export const getDetailsByIdForTable = (ids) => {
      return async (dispatch) => {
         dispatch(setLoading(true));
        try {
          const { data } = await immcaseApi.get(`/checklists/${ids}/items/active`);
          return data;
        } catch (error) {
          console.error(error);
        }finally {
          dispatch(setLoading(false));
        }
      };
    };

