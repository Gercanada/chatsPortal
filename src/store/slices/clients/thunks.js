import { toast } from 'react-toastify';
import { immcaseApi } from '../../../api';
// import { createRecord, updateRecordFormData } from '../../../../store/slices/clients/thunks';

export const createRecord = (payload, url, createContentType) => {
  return async (dispatch) => {
    // alert('create');
    try {
      const data2 = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && data2.append(key, val);
      });

      const config = {
        method: 'post',
        url: `${url}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data2,
      };

      const res = await immcaseApi(config);
      if (res) {
        toast.success('Correcto!');
      }

      return res;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid form data');
      if (error?.response?.data?.errors?.length > 1) {
        error?.response?.data?.errors?.forEach((error) => {
          toast.error(error);
        });
      }
    }
  };
};

export const updateRecord = (payload, url) => {
  // ! JSON
  const id = payload?.id;
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && data2.append(key, val);
      });

      const config = {
        method: 'put',
        url: `${url}/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data2, // JSON.stringify(payload),
      };
      const res = await immcaseApi(config);
      if (res) {
        toast.success('Cambios guardados!');
      }
      return res;
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

export const updateRecordFormData = (payload, url) => {
  const id = payload?.id;
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && data2.append(key, val);
      });

      const config = {
        method: 'post', //! When request has file, method requires be POST ?
        url: id ? `${url}/${id}/update` : url, // ! Id id is undefined takes url , example : users/account
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data2,
      };
      const res = await immcaseApi(config);
      if (res) {
        toast.success('Cambios guardados!');
      }
      return res;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid form data');
      if (error?.response?.data?.errors.length > 1) {
        error.response.data.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }
  };
};
export const changePassword = (payload) => {
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        data2.append(key, val);
      });

      const config = {
        method: 'post', //! When request has file, method requires be POST ?
        url: `user/new_password`, // ! Id id is undefined takes url , example : users/account
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data2,
      };
      const res = await immcaseApi(config);
      return res;
    } catch (error) {
      return error;
    }
  };
};

export const exportAsTemplate = (payload) => {
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      data2.append('template_id', payload.x);
      data2.append('record_id', payload.y);

      const config = {
        method: 'post',
        url: 'resource/document-templates/print',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Force to receive data in a Blob Format
        data: data2,
      };
      const res = await immcaseApi(config);
      return res;
    } catch (error) {
      console.error(error);
    }
  };
};

export const htmlToEdit = (payload) => {
  return async (dispatch) => {
    try {
      const data2 = new FormData();
      data2.append('template_id', payload.x);
      data2.append('record_id', payload.y);

      const config = {
        method: 'post',
        url: 'resource/document-templates/html_edit',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Force to receive data in a Blob Format
        data: data2,
      };
      const res = await immcaseApi(config);
      return res;
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteRecord = async (path, id) => {
  try {
    const res = await immcaseApi.delete(`${path}/${id}`);
    toast.success('Eliminado!');
    return res;
  } catch (error) {
    toast.error('Error!');
    console.error(error);
  }
};
