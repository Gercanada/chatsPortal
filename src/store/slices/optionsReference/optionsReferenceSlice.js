import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  checklistRelatedTo: [],
  checklistPnp: [],
  checklistImmforms: [],
  checklistWorkPermits: [],
  checklistStudyPermits: [],
  checklistCitizenships: [],
  checklistCompanyIncorporation: [],
  checklistElectronicQuestionnaires: [],
  checklistInternalRequests: [],
  checklistEmployerRequirements: [],
  permanentResidencies: [],
  checklistTypes: [],
  checklistStatus: [],
  tickets: [],
  usersInCL: [],
  categoriesInCL: [],
  categoriesInItem: [],
  checklists: [],
  requiredToInItem: [],
  itemStatus: [],
  immprofilesEnglishListen: [],
  immprofilesEnglishReading: [],
  immprofilesEnglishSpeaking: [],
  immprofilesEnglishTest: [],
  immprofilesEnglishWriting: [],
  contactsList: [],
};

export const optionsReferenceSlice = createSlice({
  name: 'optionsReference',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setChecklistRelatedTo: (state, { payload }) => {
      state.checklistRelatedTo = payload;
    },
    setChecklistPnp: (state, { payload }) => {
      state.checklistPnp = payload;
    },
    setChecklistImmforms: (state, { payload }) => {
      state.checklistImmforms = payload;
    },
    setChecklistWorkPermits: (state, { payload }) => {
      state.checklistWorkPermits = payload;
    },
    setChecklistStudyPermits: (state, { payload }) => {
      state.checklistStudyPermits = payload;
    },
    setChecklistCitizenships: (state, { payload }) => {
      state.checklistCitizenships = payload;
    },
    setChecklistCompanyIncorporation: (state, { payload }) => {
      state.checklistCompanyIncorporation = payload;
    },
    setChecklistElectronicQuestionnaires: (state, { payload }) => {
      state.checklistElectronicQuestionnaires = payload;
    },
    setChecklistInternalRequests: (state, { payload }) => {
      state.checklistInternalRequests = payload;
    },
    setChecklistEmployerRequirements: (state, { payload }) => {
      state.checklistEmployerRequirements = payload;
    },
    setPermanentResidencies: (state, { payload }) => {
      state.permanentResidencies = payload;
    },
    setChecklistTypes: (state, { payload }) => {
      state.checklistTypes = payload;
    },
    setChecklistStatus: (state, { payload }) => {
      state.checklistStatus = payload;
    },
    setUsersInCL: (state, { payload }) => {
      state.usersInCL = payload;
    },
    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },
    setCategoriesInCL: (state, { payload }) => {
      state.categoriesInCL = payload;
    },
    setCategoriesInItem: (state, { payload }) => {
      state.categoriesInItem = payload;
    },
    setChecklists: (state, { payload }) => {
      state.checklists = payload;
    },
    setRequiredToInItem: (state, { payload }) => {
      state.requiredToInItem = payload;
    },
    setItemStatus: (state, { payload }) => {
      state.itemStatus = payload;
    },
    setImmprofilesEnglishListen: (state, { payload }) => {
      state.immprofilesEnglishListen = payload;
    },
    setImmprofilesEnglishReading: (state, { payload }) => {
      state.immprofilesEnglishReading = payload;
    },
    setImmprofilesEnglishSpeaking: (state, { payload }) => {
      state.immprofilesEnglishSpeaking = payload;
    },
    setImmprofilesEnglishTest: (state, { payload }) => {
      state.immprofilesEnglishTest = payload;
    },
    setImmprofilesEnglishWriting: (state, { payload }) => {
      state.immprofilesEnglishWriting = payload;
    },
    setContactsList: (state, { payload }) => {
      state.contactsList = payload;
    },
  },
});

export const {
  setLoading,
  setChecklistRelatedTo,
  setChecklistPnp,
  setChecklistImmforms,
  setChecklistWorkPermits,
  setChecklistStudyPermits,
  setChecklistCitizenships,
  setChecklistCompanyIncorporation,
  setChecklistElectronicQuestionnaires,
  setChecklistInternalRequests,
  setChecklistEmployerRequirements,
  setPermanentResidencies,
  setChecklistTypes,
  setChecklistStatus,
  setUsersInCL,
  setTickets,
  setCategoriesInCL,
  setCategoriesInItem,
  setChecklists,
  setRequiredToInItem,
  setItemStatus,
  setImmprofilesEnglishListen,
  setImmprofilesEnglishReading,
  setImmprofilesEnglishSpeaking,
  setImmprofilesEnglishTest,
  setImmprofilesEnglishWriting,
  setContactsList,
} = optionsReferenceSlice.actions;
