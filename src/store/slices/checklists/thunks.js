import { immcaseApi } from '../../../api';
import { setChecklistForDetails, setLoading } from './checklistsSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';
import { setCasesForDetails } from '../cases/casesSlice';

/*
export const getPdfTemplates = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/document-templates');
      await dispatch(setPdfTemplates(data?.data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
*/

export const getReturnChecklist = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/checklists/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const createChecklist = ( payload ) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPost = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && dataForPost.append(key, val);
      });

      const config = {
        method: 'post',
        url: 'resource/checklists',
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

export const updateChecklist = ({ idChecklist, payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPut = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        val && dataForPut.append(key, val);
      });

      const config = {
        method: 'put',
        url: `resource/checklists/${idChecklist}`,
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

export const getChecklistByIdDetails = ( idChecklist ) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/checklists/${idChecklist}`);
      await dispatch(setChecklistForDetails(data.data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
