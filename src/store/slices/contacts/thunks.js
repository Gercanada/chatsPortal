import { immcaseApi } from '../../../api';

import {
  setLoading,
  setContactForDetails,
  setContactForEdit,
  setCountries,
  setCustomerCares,
  setContactTypes,
  setLeadSources,
  setHomeCountryCodes,
  setOfficeCountryCodes,
  setOtherCountryCodes,
  setEmergencyRelationType,
  setEmergencyCountryCodes,
  setUsersList,
  setContactsInvoices,
  setContactQuotes,
  setContactProfilesDetails,
} from './contactsSlice';
import * as FormData from 'form-data';
import { toast } from 'react-toastify';

export const createContact = ({ payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const dataForPost = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        val && val && dataForPost.append(key, val);
      });


      const config = {
        method: 'post',
        url: 'resource/clients',
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

export const updateContact = ({ idContact, payload }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
//      const dataForPost = new FormData();
//      Object.entries(payload).forEach(([key, val]) => {
 //       val && val && dataForPost.append(key, val);
 //     });
      const dataForPost = payload;
      const config = {
        method: 'post',
        url: `resource/clients/${idContact}/update`,
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

export const getContactById = ({ idContact }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${idContact}`);
      await dispatch(setContactForEdit(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getContactByIdDetails = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${parseInt(id)}`);
      await dispatch(setContactForDetails(data));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getCountries = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/countries/select');
      await dispatch(setCountries(data?.countries));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getCustomerCares = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/customer_cares/select');
      await dispatch(setCustomerCares(data?.customer_cares));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getContactTypes = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/contact_types/select');
      await dispatch(setContactTypes(data?.contact_types));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getLeadSources = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/lead_sources/select');
      await dispatch(setLeadSources(data?.lead_sources));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getOfficeCountryCodes = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/phone_codes/office_phone/select');
      await dispatch(setOfficeCountryCodes(data?.office_phone_country_codes));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getHomeCountryCodes = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/phone_codes/home_phone/select');
      await dispatch(setHomeCountryCodes(data?.home_phone_country_codes));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getEmergencyCountryCodes = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/phone_codes/other_country/select');
      await dispatch(setEmergencyCountryCodes(data?.other_phone_country_codes));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};
export const getOtherCountryCodes = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/phone_codes/other_country/select');
      await dispatch(setOtherCountryCodes(data?.other_phone_country_codes));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getEmergencyRelationType = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get('/resource/clients/emergency_relation_types/select');
      await dispatch(setEmergencyRelationType(data?.emergency_relation_types));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getUsersList = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/users/select`);
      await dispatch(setUsersList(data.users));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getContactImmprofilesDetails = (id) => {
  return async (dispatch) => {
     dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${id}/immprofiles`);
      await dispatch(setContactProfilesDetails(data));
      return data;
    } catch (error) {
      console.error(error);
    }
     dispatch(setLoading(false));
  };
};

export const getContactsInvoices = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${id}/invoices`);
      await dispatch(setContactsInvoices(data)) 
      return data
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
}
export const getContactQuotesDetails = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/clients/${id}/quotes`);
      await dispatch(setContactQuotes(data)) 
      return data
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
}
