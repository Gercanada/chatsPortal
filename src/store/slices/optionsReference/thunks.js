import { immcaseApi } from '../../../api';
import {
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
  setContactsList,
  setImmprofilesEnglishSpeaking,
  setImmprofilesEnglishTest,
  setImmprofilesEnglishWriting,
} from './optionsReferenceSlice';

export const getChecklistRelatedTo = () =>
  getDataSelectReference('checklists/related', 'related_to', setChecklistRelatedTo);

export const getChecklistPnp = () =>
  getDataSelectReference('checklists/pnp', 'related_to', setChecklistPnp);

export const getChecklistImmforms = () =>
  getDataSelectReference('checklists/immforms', 'related_to', setChecklistImmforms);

export const getChecklistWorkPermits = () =>
  getDataSelectReference('checklists/work_permits', 'work_permits', setChecklistWorkPermits);

export const getChecklistStudyPermits = () =>
  getDataSelectReference('checklists/study_permits', 'study_permits', setChecklistStudyPermits);

export const getChecklistCitizenships = () =>
  getDataSelectReference('checklists/citizenships', 'citizenships', setChecklistCitizenships);

export const getChecklistCompanyIncorporation = () =>
  getDataSelectReference(
    'checklists/company_incorporation',
    'c_incorporations',
    setChecklistCompanyIncorporation,
  );

export const getChecklistElectronicQuestionnaires = () =>
  getDataSelectReference(
    'checklists/electronic_questionnaires',
    'e_questionnaires',
    setChecklistElectronicQuestionnaires,
  );

export const getChecklistInternalRequests = () =>
  getDataSelectReference(
    'checklists/internal_requests',
    'internal_requests',
    setChecklistInternalRequests,
  );

export const getChecklistEmployerRequirements = () =>
  getDataSelectReference(
    'checklists/employer_requirements',
    'emp_requirements',
    setChecklistEmployerRequirements,
  );

export const getPermanentResidencies = () =>
  getDataSelectReference(
    'checklists/permanent_residencies',
    'permanent_residencies',
    setPermanentResidencies,
  );

export const getChecklistTypes = () =>
  getDataSelectReference('checklists/types', 'types', setChecklistTypes);

export const getChecklistStatus = () =>
  getDataSelectReference('checklists/statuses', 'statuses', setChecklistStatus);

const getDataSelectReference = (path, responseKey, functionDispatch) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await immcaseApi.get(`/resource/${path}/select`);
      if (data[responseKey]) await dispatch(functionDispatch(data[responseKey]));
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };
};

export const getUsersInCL = () => getDataSelectReference('users', 'users', setUsersInCL);

export const getTickets = () => getDataSelectReference('tickets', 'cases', setTickets);

export const getCheckLists = () =>
  getDataSelectReference('checklists', 'checklists', setChecklists);

export const getCategoriesInCL = () =>
  getDataSelectReference('tickets/categories', 'categories', setCategoriesInCL);

export const getCategoriesInItem = () =>
  getDataSelectReference('items/categories', 'types', setCategoriesInItem);

export const getRequiredInItem = () =>
  getDataSelectReference('items/required_to', 'required_to', setRequiredToInItem);

export const getItemsStatus = () =>
  getDataSelectReference('items/statuses', 'statuses', setItemStatus);

export const getImmprofilesEnglishListen = () =>
  getDataSelectReference('immprofiles/english/listen', 'listens', setImmprofilesEnglishListen);

export const getImmprofilesEnglishReading = () =>
  getDataSelectReference('immprofiles/english/reading', 'readings', setImmprofilesEnglishReading);

export const getImmprofilesEnglishSpeaking = () =>
  getDataSelectReference('immprofiles/english/speaking', 'speaking', setImmprofilesEnglishSpeaking);

export const getImmprofilesEnglishTest = () =>
  getDataSelectReference('immprofiles/english/test', 'tests', setImmprofilesEnglishTest);

export const getImmprofilesEnglishWriting = () =>
  getDataSelectReference('immprofiles/english/writing', 'readings', setImmprofilesEnglishWriting);

export const getContactsList = () => getDataSelectReference('clients', 'contacts', setContactsList);
