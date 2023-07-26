import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { updateRecordFormData } from '../../../../../store/slices/form/thunks';
import { FormGroup } from '../../../../components/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import StyledReactSelect from '../../../../components/StyledReactSelect';
import { Loader } from '../../../../../components/Loader';
import {
  getCategoriesInCL,
  getChecklistCitizenships,
  getChecklistCompanyIncorporation,
  getChecklistElectronicQuestionnaires,
  getChecklistEmployerRequirements,
  getChecklistImmforms,
  getChecklistInternalRequests,
  getChecklistPnp,
  getChecklistRelatedTo,
  getChecklistStatus,
  getChecklistStudyPermits,
  getChecklistTypes,
  getChecklistWorkPermits,
  getPermanentResidencies,
  getTickets,
  getUsersInCL,
} from '../../../../../store/slices/optionsReference';
import { useEffect, useState } from 'react';
import CButton from '../../../../../components/Button/CButton';
import useQuery from '../../../../../hooks/useQuery';
import { useFetchApi } from '../../../../hooks';
import { toast } from 'react-toastify';
import {
  createChecklist,
  getReturnChecklist,
  updateChecklist,
} from '../../../../../store/slices/checklists/thunks';

export const FormChecklist = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const {
    loading: loadingOptionsReference,
    checklistRelatedTo,
    checklistPnp,
    checklistImmforms,
    checklistWorkPermits,
    checklistStudyPermits,
    checklistCitizenships,
    checklistCompanyIncorporation,
    checklistElectronicQuestionnaires,
    checklistInternalRequests,
    checklistEmployerRequirements,
    permanentResidencies,
    checklistTypes,
    checklistStatus,
    tickets: ticketsInCL,
    usersInCL,
    categoriesInCL,
  } = useSelector((state) => state.optionsReference);

  const { loading: loadingChecklists } = useSelector((state) => state.checklists);

  const loading = loadingOptionsReference || loadingChecklists;

  const [isDisableTicketId, setIsDisableTicketId] = useState(false);

  const navigateTo = (url) => {
    navigate(url);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    onInputChange,
  } = useForm({
    defaultValues: {},
  });

  const idIsInArray = (id, array) => {
    for (var i = 0; i < array.length; i++) {
      const item = array[i];
      if (parseInt(item.id, 10) === id) return true;
    }
    return false;
  };

  const setDefaultValues = async () => {
    if (
      id &&
      checklistTypes?.length > 0 &&
      ticketsInCL?.length &&
      checklistStatus?.length &&
      usersInCL?.length
    ) {
      const response = await dispatch(getReturnChecklist(id));
      if (response) {
        if (response?.status >= 400) {
          toast.error(`record with id = ${id} not found`);
          navigateTo(`${'/immigration/checklists'}`);
        } else {
          const content = response?.content || [];
    

          if (Object.keys(content).length > 0) {
            Object.entries(content).forEach(([key, value]) => {
              if (key === 'related_to' && Array.isArray(value)) {
                const options = checklistRelatedTo.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'pnp' && Array.isArray(value)) {
                const options = checklistPnp.filter((i) => idIsInArray(parseInt(i.id), value));
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'imm_forms' && Array.isArray(value)) {
                const options = checklistImmforms.filter((i) => idIsInArray(parseInt(i.id), value));
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'work_permits' && Array.isArray(value)) {
                const options = checklistWorkPermits.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'study_permits' && Array.isArray(value)) {
                const options = checklistStudyPermits.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'citizenships' && Array.isArray(value)) {
                const options = checklistCitizenships.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'company_incorporations' && Array.isArray(value)) {
                const options = checklistCompanyIncorporation.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'electronic_questionnaires' && Array.isArray(value)) {
                const options = checklistElectronicQuestionnaires.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'internal_requests' && Array.isArray(value)) {
                const options = checklistInternalRequests.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'employer_requirements' && Array.isArray(value)) {
                const options = checklistEmployerRequirements.filter((i) =>
                  idIsInArray(parseInt(i.id), value),
                );
                setValue(
                  key,
                  options.map((i) => ({ value: i.id, label: i.name })),
                );
              } else if (key === 'ticket_id' && value?.id) {
                const option = ticketsInCL.find(
                  (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
                );
                setValue(key, { value: option.id, label: option.ticket });
              } else if (key === 'assigned_to' && value?.id) {
                const option = usersInCL.find(
                  (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
                );
                setValue(key, { value: option.id, label: option.username });
              } else if (key === 'status_id' && value?.id) {
                const option = checklistStatus.find(
                  (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
                );
                setValue(key, { value: option.id, label: option.name });
              } else if (key === 'type_id' && value?.id) {
                const option = checklistTypes.find(
                  (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
                );
                setValue(key, { value: option.id, label: option.name });
              } else {
                let setVal = null;

                if (typeof value !== 'undefined' && value !== null) {
                  if (typeof value === 'object') {
                    if (Object.keys(value).includes('ref')) {
                      setVal = value?.ref.split('/')[4];
                    }
                  } else {
                    setVal = value;
                  }
                  setValue(key, setVal);
                }
              }
            });
          }
        }
      }
    }
  };

  const onSubmit = async (formDataParam) => {
    const formData = {};

    Object.keys(formDataParam).forEach((item) => {
      if (
        typeof formDataParam[item] === 'object' &&
        formDataParam[item]?.value &&
        formDataParam[item]?.label
      ) {
        formData[item] = formDataParam[item].value;
      } else if (moment.isMoment(formDataParam[item])) {
        formData[item] = formDataParam[item].format('YYYY-MM-DD');
      } else if (formDataParam[item] instanceof FileList) {
        if (formDataParam[item].length > 0) {
          formData[item] = formDataParam[item][0];
        } else {
          formData[item] = null;
        }
      } else if (Array.isArray(formDataParam[item])) {
        formData[item] = `[${formDataParam[item].map((i) => i.value).toString()}]`;
      } else {
        formData[item] = formDataParam[item];
      }
    });

    if (Object.keys(formData).includes('id')) {
      const res = await dispatch(updateChecklist({ idChecklist: id, payload: formData }));
      if (res) navigateTo('/immigration/checklists');
    } else {
      const res = await dispatch(createChecklist({ payload: formData }));
      if (res) navigateTo('/immigration/checklists');
    }
  };

  useEffect(() => {
    setDefaultValues();
  }, [id, checklistTypes?.length, ticketsInCL?.length, checklistStatus?.length, usersInCL?.length]);

  useEffect(() => {
    if (checklistRelatedTo?.length === 0) {
      dispatch(getChecklistRelatedTo());
    }
  }, [checklistRelatedTo?.length]);

  useEffect(() => {
    if (checklistPnp?.length === 0) {
      dispatch(getChecklistPnp());
    }
  }, [checklistPnp?.length]);

  useEffect(() => {
    if (checklistImmforms?.length === 0) {
      dispatch(getChecklistImmforms());
    }
  }, [checklistImmforms?.length]);

  useEffect(() => {
    if (checklistWorkPermits?.length === 0) {
      dispatch(getChecklistWorkPermits());
    }
  }, [checklistWorkPermits?.length]);

  useEffect(() => {
    if (checklistStudyPermits?.length === 0) {
      dispatch(getChecklistStudyPermits());
    }
  }, [checklistStudyPermits?.length]);

  useEffect(() => {
    if (checklistCitizenships?.length === 0) {
      dispatch(getChecklistCitizenships());
    }
  }, [checklistCitizenships?.length]);

  useEffect(() => {
    if (checklistCompanyIncorporation?.length === 0) {
      dispatch(getChecklistCompanyIncorporation());
    }
  }, [checklistCompanyIncorporation?.length]);

  useEffect(() => {
    if (checklistElectronicQuestionnaires?.length === 0) {
      dispatch(getChecklistElectronicQuestionnaires());
    }
  }, [checklistElectronicQuestionnaires?.length]);

  useEffect(() => {
    if (checklistInternalRequests?.length === 0) {
      dispatch(getChecklistInternalRequests());
    }
  }, [checklistInternalRequests?.length]);

  useEffect(() => {
    if (checklistEmployerRequirements?.length === 0) {
      dispatch(getChecklistEmployerRequirements());
    }
  }, [checklistEmployerRequirements?.length]);

  useEffect(() => {
    if (permanentResidencies?.length === 0) {
      dispatch(getPermanentResidencies());
    }
  }, [permanentResidencies?.length]);

  useEffect(() => {
    if (checklistTypes?.length === 0) {
      dispatch(getChecklistTypes());
    }
  }, [checklistTypes?.length]);

  useEffect(() => {
    if (checklistStatus?.length === 0) {
      dispatch(getChecklistStatus());
    }
  }, [checklistStatus?.length]);

  useEffect(() => {
    if (usersInCL?.length === 0) {
      dispatch(getUsersInCL());
    }
  }, [usersInCL?.length]);

  useEffect(() => {
    if (categoriesInCL?.length === 0) {
      dispatch(getCategoriesInCL());
    }
  }, [categoriesInCL?.length]);

  useEffect(() => {
    if (ticketsInCL?.length === 0) {
      dispatch(getTickets());
    }
  }, [ticketsInCL?.length]);

  useEffect(() => {
    if (query.has('case') && ticketsInCL.length > 0) {
      // value: i.id, label: i.client,
      const idTicketLocal = parseInt(query.get('case'), 10);
      const option = ticketsInCL.find((i) => i.id === idTicketLocal);
      setValue('ticket_id', { value: option.id, label: option.ticket });
      setIsDisableTicketId(true);
    }
  }, [query.get('case'), ticketsInCL.length]);

  return (
    <Card>
      <FormGroup>
        {loading ? (
          <Loader />
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                padding: '30px 20px',
                borderRadius: '3px',
              }}
              className='summary-card'
            >
              <Grid container spacing={2}>
                <Grid item xs={12} flexDirection='row'>
                  <Typography
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    variant='h1'
                    component='h1'
                  >
                    {typeof id !== 'undefined' ? t('update_checklist') : t('create_checklist')}
                  </Typography>
                </Grid>
                <Grid item xs={12} flexDirection='row'>
                  <Grid item flexDirection='column' xs={12}>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography>{t('basic_info')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id={'title'}>
                              {t('title')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <TextField
                              {...register('title', {
                                required: `${t('field')} ${t('title')} ${t('is_required')}`,
                              })}
                              type='text'
                              name='title'
                              variant='filled'
                              fullWidth
                              autoComplete={`new-title`}
                              error={!!errors.title}
                              helperText={errors.title?.message}
                              onChange={onInputChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id={'checklist_no'}>
                              {t('checklist_no')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <TextField
                              {...register('checklist_no', {
                                required: `${t('field')} ${t('checklist_no')} ${t('is_required')}`,
                              })}
                              type='number'
                              name='checklist_no'
                              variant='filled'
                              fullWidth
                              autoComplete={`new-checklist_no`}
                              error={!!errors.checklist_no}
                              helperText={errors.checklist_no?.message}
                              onChange={onInputChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id={'description'}>
                              {t('description')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <TextField
                              {...register('description', {
                                required: `${t('field')} ${t('description')} ${t('is_required')}`,
                              })}
                              type='text'
                              name='description'
                              variant='filled'
                              fullWidth
                              autoComplete={`new-description`}
                              error={!!errors.description}
                              helperText={errors.description?.message}
                              onChange={onInputChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id={'gov_app_num'}>
                              {t('gov_app_num')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <TextField
                              {...register('gov_app_num', {
                                required: `${t('field')} ${t('gov_app_num')} ${t('is_required')}`,
                              })}
                              type='number'
                              name='gov_app_num'
                              variant='filled'
                              fullWidth
                              autoComplete={`new-gov_app_num`}
                              error={!!errors.gov_app_num}
                              helperText={errors.gov_app_num?.message}
                              onChange={onInputChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id='ticket_id'>
                              {t('ticket_id')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='ticket_id'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isDisabled={isDisableTicketId}
                                  {...fieldSelect}
                                  options={ticketsInCL.map((item) => ({
                                    value: item.id,
                                    label: item.ticket,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id='type_id'>
                              {t('type_id')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='type_id'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  {...fieldSelect}
                                  options={checklistTypes.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id='status_id'>
                              {t('status_id')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='status_id'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  {...fieldSelect}
                                  options={checklistStatus.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id='assigned_to'>
                              {t('assigned_to')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='assigned_to'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  {...fieldSelect}
                                  options={usersInCL.map((item) => ({
                                    value: item.id,
                                    label: item.user,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography>{t('links')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('related_to')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='related_to'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistRelatedTo.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('pnp')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='pnp'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistPnp.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('imm_forms')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='imm_forms'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistImmforms.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('work_permits')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='work_permits'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistWorkPermits.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('study_permits')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='study_permits'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistStudyPermits.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('citizenships')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='citizenships'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistCitizenships.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('company_incorporations')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='company_incorporations'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistCompanyIncorporation.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('electronic_questionnaires')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='electronic_questionnaires'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistElectronicQuestionnaires.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('internal_requests')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='internal_requests'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistInternalRequests.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <InputLabel>
                              {t('employer_requirements')}
                              <span className='text-danger'> * </span>
                            </InputLabel>
                            <Controller
                              name='employer_requirements'
                              control={control}
                              render={({ field: fieldSelect }) => (
                                <StyledReactSelect
                                  isMulti
                                  {...fieldSelect}
                                  options={checklistEmployerRequirements.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                  }))}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CButton
                    loading={loading}
                    type='submit'
                    color='iconverde'
                    className='circular-btn'
                    size='large'
                    fullWidth
                  >
                    Guardar
                  </CButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </FormGroup>
    </Card>
  );
};
