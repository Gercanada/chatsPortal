import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  contacts: [],
  countries: [],
  customer_cares: [],
  contactForEdit: {},
  contactForDetails: {},
  contactTypes: [],
  leadSources: [],
  officePhoneCountryCodes: [],
  homePhoneCountryCodes: [],
  otherPhoneCountryCodes: [],
  emergencyPhoneCountryCodes: [],
  emergencyRelationTypes: [],
  contactsInvoices: [],
  contactQuotes: [],
  contactProfilesDetails:[],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setContactForEdit: (state, { payload }) => {
      state.contactForEdit = payload;
    },
    setContactForDetails: (state, { payload }) => {
      state.contactForDetails = payload;
    },
   
  },
});

export const {
  setContacts,
  setLoading,
  setContactForEdit,
  setContactForDetails,
  setCountries,
  setCustomerCares,
  setContactTypes,
  setLeadSources,
  setUsersList,
  setOfficeCountryCodes,
  setHomeCountryCodes,
  setOtherCountryCodes,
  setEmergencyCountryCodes,
  setEmergencyRelationType,
  setContactsInvoices,
  setContactQuotes,
  setContactProfilesDetails,

} = contactsSlice.actions;
