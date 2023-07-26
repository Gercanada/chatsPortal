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
    setUsersList: (state, { payload }) => {
      state.usersList = payload;
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
    setCountries: (state, { payload }) => {
      state.countries = payload;
    },
    setCustomerCares: (state, { payload }) => {
      state.customer_cares = payload;
    },
    setContactTypes: (state, { payload }) => {
      state.contactTypes = payload;
    },
    setLeadSources: (state, { payload }) => {
      state.leadSources = payload;
    },
    setOfficeCountryCodes: (state, { payload }) => {
      state.officePhoneCountryCodes = payload;
    },
    setHomeCountryCodes: (state, { payload }) => {
      state.homePhoneCountryCodes = payload;
    },
    setOtherCountryCodes: (state, { payload }) => {
      state.otherPhoneCountryCodes = payload;
    },
    setEmergencyCountryCodes: (state, { payload }) => {
      state.emergencyPhoneCountryCodes = payload;
    },
    setEmergencyRelationType: (state, { payload }) => {
      state.emergencyRelationTypes = payload;
    },
    setContactQuotes: (state, { payload }) => {
      state.contactQuotes = payload;
    },
    setContactsInvoices: (state, {payload}) => {
      state.contactsInvoices = payload;
    },
    setContactProfilesDetails:(state,{payload}) =>{
      state.contactProfilesDetails = payload;
    }
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
