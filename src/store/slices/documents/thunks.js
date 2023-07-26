import { immcaseApi } from '../../../api';
import { setPdfTemplates, setLoading } from './documentsSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

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

export const addPdfTemplate = ({ name, content, typeId, description, language }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data2 = new FormData();
      data2.append('name', name);
      data2.append('content', content);
      data2.append('type_id', typeId);
      data2.append('description', description);
      data2.append('language', language);

      const config = {
        method: 'post',
        url: 'resource/document-templates',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data2,
      };

      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
        dispatch(getPdfTemplates());
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const updatePdfTemplate = ({ name, content, idTemplate }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data2 = new FormData();
      data2.append('name', name);
      data2.append('content', content);

      const config = {
        method: 'put',
        url: `resource/document-templates/${idTemplate}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data2,
      };

      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
        dispatch(getPdfTemplates());
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
