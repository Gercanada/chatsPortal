// import {
//   Accordion,
//   AccordionDetails,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   InputLabel,
//   Radio,
//   RadioGroup,
//   TextareaAutosize,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';
// import { createRecord, updateRecord } from '../../../../../store/slices/form/thunks';
// import { FormGroup } from '../../../../components/FormGroup';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFetchApi } from '../../../../hooks';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import CDatePicker from '../../../../components/CDatePicker';
// import moment from 'moment';
// import StyledReactSelect from '../../../../components/StyledReactSelect';
// import { Loader } from '../../../../../components/Loader';
// import useQuery from '../../../../../hooks/useQuery';
// import { useEffect, useState } from 'react';
// import {

//   getContactsList,
//   getSubCategoriesList,
//   getTypesList,
//   getConsultantsList,
//   getProcessorsList,
//   getPrioritiesList,
//   getStreamsList,
//   getStatusesList,
//   getGovOfficesList,
//   getUsersList,
//   getReturnCase,
// } from '../../../../../store/slices/cases';

 export const FormCase = () => {
//   const { id } = useParams();
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const query = useQuery();

//   const {
//     loading,
//     contactsList,
//     categoriesList,
//     subCategoriesList,
//     typesList,
//     consultantsList,
//     processorsList,
//     prioritiesList,
//     streamsList,
//     statusesList,
//     govOfficesList,
//     usersList,
//   } = useSelector((state) => state.cases);

//   const navigateTo = (url) => {
//     navigate(url);
//   };

//   const [isDisableClientId, setIsDisableClientId] = useState(false);

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     onInputChange,
//   } = useForm({
//     defaultValues: {},
//   });

//   /**
//     setDefaultValues es una función que se encarga de establecer los valores 
//     predeterminados para ciertos campos en un formulario.
//     @param {number} id - El id del caso
//     @param {array} statusesList - Lista de estados
//     @param {array} contactsList - Lista de contactos
//     @param {array} categoriesList - Lista de categorías
//     @param {array} subCategoriesList - Lista de subcategorías
//     @param {array} typesList - Lista de tipos
//     @param {array} consultantsList - Lista de consultores
//     @param {array} processorsList - Lista de procesadores
//     @param {array} usersList - Lista de usuarios
//     @param {array} prioritiesList - Lista de prioridades
//     @param {array} streamsList - Lista de flujos
//     @returns {void}
//     @throws {Error} Si la respuesta de la llamada a getReturnCase tiene un estado de error (mayor o igual a 400),
//       se muestra un mensaje de error y se redirige a la página de casos de inmigración.
      
//     @req {object} dispatch - La función de despacho de Redux para realizar una llamada a la acción getReturnCase
//     @req {function} navigateTo - La función de navegación para redirigir a la página de casos de inmigración
//     @req {function} setValue - La función para establecer el valor de un campo en un formulario
//     @req {function} toast - La función para mostrar un mensaje de error
//     @res {object} response - La respuesta de la llamada a getReturnCase
//     @res {object} content - El contenido de la respuesta de la llamada a getReturnCase
// */

//   const setDefaultValues = async () => {
//     if (
//       id &&
//       statusesList.length > 0 &&
//       contactsList.length > 0 &&
//       categoriesList.length > 0 &&
//       subCategoriesList.length > 0 &&
//       typesList.length > 0 &&
//       consultantsList.length > 0 &&
//       processorsList.length > 0 &&
//       usersList.length > 0 &&
//       prioritiesList.length > 0 &&
//       streamsList.length > 0
//     ) {
//       const response = await dispatch(getReturnCase(id));
//       if (response) {
//         if (response?.status >= 400) {
//           toast.error(`record with id = ${id} not found`);
//           navigateTo(`${'/immigration/cases'}`);
//         } else {
//           const content = response?.content || [];

//           if (Object.keys(content).length > 0) {
//             Object.entries(content).forEach(([key, value]) => {
//               if (key === 'status_id' && value) {
//                 const option = statusesList.find((i) => parseInt(i.id, 10) === parseInt(value, 10));
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'client_id' && value?.id) {
//                 const option = contactsList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.client });
//               } else if (key === 'category_id' && value) {
//                 const option = categoriesList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'subcategory_id' && value) {
//                 const option = subCategoriesList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'type_id' && value) {
//                 const option = typesList.find((i) => parseInt(i.id, 10) === parseInt(value, 10));
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'consultant_id' && value) {
//                 const option = consultantsList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'processor_id' && value) {
//                 const option = processorsList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'assigned_to' && value?.id) {
//                 const option = usersList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.username });
//               } else if (key === 'priority_id' && value) {
//                 const option = prioritiesList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'stream_id' && value) {
//                 const option = streamsList.find((i) => parseInt(i.id, 10) === parseInt(value, 10));
//                 setValue(key, { value: option.id, label: option.name });
//               } else if (key === 'gov_office_processes_id' && value?.id) {
//                 const option = govOfficesList.find(
//                   (i) => parseInt(i.id, 10) === parseInt(value?.id, 10),
//                 );
//                 setValue(key, { value: option.id, label: option.name });
//               } else {
//                 let setVal = null;

//                 if (typeof value !== 'undefined' && value !== null) {
//                   if (typeof value === 'object') {
//                     if (Object.keys(value).includes('ref')) {
//                       setVal = value?.ref.split('/')[4];
//                     }
//                   } else {
//                     setVal = value;
//                   }
//                   setValue(key, setVal);
//                 }
//               }
//             });
//           }
//         }
//       }
//     }
//   };

//   const onSubmit = (formDataParam) => {
//     const formData = {};
//     Object.keys(formDataParam).forEach((item) => {
//       if (
//         typeof formDataParam[item] === 'object' &&
//         formDataParam[item]?.value &&
//         formDataParam[item]?.label
//       ) {
//         formData[item] = formDataParam[item].value;
//       } else if (moment.isMoment(formDataParam[item])) {
//         formData[item] = formDataParam[item].format('YYYY-MM-DD');
//       } else if (formDataParam[item] instanceof FileList) {
//         if (formDataParam[item].length > 0) {
//           formData[item] = formDataParam[item][0];
//         } else {
//           formData[item] = null;
//         }
//       } else {
//         formData[item] = formDataParam[item];
//       }
//     });

//     if (Object.keys(formData).includes('id')) {
//       dispatch(updateRecord(formData, '/resource/tickets')).then((res) => {
//         if (res.status === 200 || res.status === 201) navigateTo('/immigration/cases');
//       });
//     } else {
//       dispatch(createRecord(formData, '/resource/tickets', 'multipart/form-data')).then((res) => {
//         if (res.status === 200 || res.status === 201) navigateTo('/immigration/cases');
//       });
//     }
//   };

//   useEffect(() => {
//     setDefaultValues();
//   }, [
//     id,
//     statusesList.length,
//     contactsList.length,
//     categoriesList.length,
//     subCategoriesList.length,
//     typesList.length,
//     consultantsList.length,
//     processorsList.length,
//     usersList.length,
//     prioritiesList.length,
//     streamsList.length,
//   ]);

//   useEffect(() => {
//     dispatch(getContactsList());

//     dispatch(getSubCategoriesList());
//     dispatch(getTypesList());
//     dispatch(getConsultantsList());
//     dispatch(getProcessorsList());
//     dispatch(getPrioritiesList());
//     dispatch(getStreamsList());
//     dispatch(getStatusesList());
//     dispatch(getGovOfficesList());
//     dispatch(getUsersList());
//   }, []);

//   useEffect(() => {
//     //!
//     if (query.has('idClient') && contactsList.length > 0) {
//       const idClientLocal = parseInt(query.get('idClient'), 10);
//       const option = contactsList.find((i) => i.id === idClientLocal);
//       setValue('client_id', { value: option.id, label: option.client });
//       setIsDisableClientId(true);
//     }
//   }, [query.get('idClient'), contactsList.length]);

//   return (
//     <FormGroup>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Card>
//           <form noValidate onSubmit={handleSubmit(onSubmit)}>
//             <Box
//               sx={{
//                 padding: '30px 20px',
//                 borderRadius: '3px',
//               }}
//               className='summary-card'
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} flexDirection='row'>
//                   <Typography
//                     sx={{ display: 'flex', justifyContent: 'center' }}
//                     variant='h1'
//                     component='h1'
//                   >
//                     {typeof id !== 'undefined' ? t('update_case') : t('create_case')}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} flexDirection='row'>
//                   <Grid item flexDirection='column' xs={12}>
//                     <Accordion defaultExpanded>
//                       <CardHeader title={<Typography>{t('case_info')}</Typography>} />
//                       <Divider />
//                       <AccordionDetails>
//                         <Grid item container xs={12} spacing={2}>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'title'}>
//                               {t('title')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <TextField
//                               {...register('title', {
//                                 required: `${t('field')} ${t('title')} ${t('is_required')}`,
//                               })}
//                               type='text'
//                               name='title'
//                               variant='filled'
//                               fullWidth
//                               autoComplete={`new-title`}
//                               error={!!errors.title}
//                               helperText={errors.title?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='client_id'>
//                               {t('client_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register('client_id', {
//                                 required: `${t('field')} ${t('client_id')} ${t('is_required')}`,
//                               })}
//                               name='client_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <StyledReactSelect
//                                   isDisabled={isDisableClientId}
//                                   {...fieldSelect}
//                                   options={contactsList.map((i) => ({
//                                     value: i.id,
//                                     label: i.client,
//                                   }))}
//                                 />
//                               )}
//                             />
//                           </Grid>

//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='status_id'>
//                               {t('status_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register('status_id', {
//                                 required: `${t('field')} ${t('status_id')} ${t('is_required')}`,
//                               })}
//                               name='status_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <StyledReactSelect
//                                   {...fieldSelect}
//                                   options={statusesList.map((i) => ({
//                                     value: i.id,
//                                     label: i.name,
//                                   }))}
//                                 />
//                               )}
//                             />
//                           </Grid>

//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='category_id'>
//                               {t('category_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register('category_id', {
//                                 required: `${t('field')} ${t('category_id')} ${t('is_required')}`,
//                               })}
//                               name='category_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={categoriesList.map((i) => ({
//                                       value: i.id,
//                                       label: i.name,
//                                     }))}
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='subcategory_id'>{t('subcategory_id')}</InputLabel>
//                             <Controller
//                               {...register('subcategory_id')}
//                               name='subcategory_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={subCategoriesList.map((i) => ({
//                                       value: i.id,
//                                       label: i.name,
//                                     }))}
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'accompanying_children'}>
//                               {t('accompanying_children')}
//                             </InputLabel>
//                             <TextField
//                               {...register('accompanying_children')}
//                               type='number'
//                               name='accompanying_children'
//                               variant='filled'
//                               fullWidth
//                               autoComplete={`new-accompanying_children`}
//                               error={!!errors.accompanying_children}
//                               helperText={errors.accompanying_children?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='type_id'>
//                               {t('type_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'type_id' /* , {
//                                 required: `${t('field')} ${t('type_id')} ${t('is_required')}`,
//                               } */,
//                               )}
//                               name='type_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   {
//                                     <StyledReactSelect
//                                       {...fieldSelect}
//                                       options={typesList.map((i) => ({
//                                         value: i.id,
//                                         label: i.name,
//                                       }))}
//                                     />
//                                   }
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <FormControl>
//                               <FormLabel id='accompanying_spouse-radio-buttons-group-label'>
//                                 {t('accompanying_spouse')}
//                               </FormLabel>
//                               <RadioGroup
//                                 row
//                                 aria-labelledby='accompanying_spouse-radio-buttons-group-label'
//                                 defaultValue={0}
//                                 name='radio-buttons-group'
//                               >
//                                 <FormControlLabel
//                                   {...register('accompanying_spouse')}
//                                   value={1}
//                                   control={<Radio />}
//                                   label={t('yes')}
//                                 />
//                                 <FormControlLabel
//                                   {...register('accompanying_spouse')}
//                                   value={0}
//                                   control={<Radio />}
//                                   label={t('no')}
//                                 />
//                               </RadioGroup>
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'num_of_applicants'}>
//                               {t('num_of_applicants')}
//                             </InputLabel>
//                             <TextField
//                               {...register('num_of_applicants')}
//                               type='number'
//                               name='num_of_applicants'
//                               variant='filled'
//                               fullWidth
//                               autoComplete={`new-num_of_applicants`}
//                               error={!!errors.num_of_applicants}
//                               helperText={errors.num_of_applicants?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='consultant_id'>
//                               {t('consultant_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'consultant_id' /* , {
//                                 required: `${t('field')} ${t('consultant_id')} ${t('is_required')}`,
//                               } */,
//                               )}
//                               name='consultant_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={consultantsList.map((i) => ({
//                                       value: i.id,
//                                       label: i.name,
//                                     }))}
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='processor_id'>
//                               {t('processor_id')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'processor_id' /* , {
//                                 required: `${t('field')} ${t('processor_id')} ${t('is_required')}`,
//                               } */,
//                               )}
//                               name='processor_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={
//                                       processorsList.map((i) => ({
//                                         value: i.id,
//                                         label: i.name,
//                                       })) || []
//                                     }
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='assigned_to'>
//                               {t('assigned_to')}
//                               <span className='text-danger'> * </span>
//                             </InputLabel>
//                             <Controller
//                               {...register('assigned_to', {
//                                 required: `${t('field')} ${t('assigned_to')} ${t('is_required')}`,
//                               })}
//                               name='assigned_to'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <StyledReactSelect
//                                   {...fieldSelect}
//                                   options={
//                                     usersList.map((i) => ({
//                                       value: i.id,
//                                       label: i.user,
//                                     })) || []
//                                   }
//                                 />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='priority_id'>
//                               {t('priority_id')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'priority_id' /* , {
//                                 required: `${t('field')} ${t('priority_id')} ${t('is_required')}`,
//                               } */,
//                               )}
//                               name='priority_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={prioritiesList.map((i) => ({
//                                       value: i.id,
//                                       label: i.name,
//                                     }))}
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='stream_id'>
//                               {t('stream_id')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'stream_id' /* , {
//                                 required: `${t('field')} ${t('stream_id')} ${t('is_required')}`,
//                               } */,
//                               )}
//                               name='stream_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <Grid item>
//                                   <StyledReactSelect
//                                     {...fieldSelect}
//                                     options={
//                                       streamsList.map((i) => ({
//                                         value: i.id,
//                                         label: i.name,
//                                       })) || []
//                                     }
//                                   />
//                                 </Grid>
//                               )}
//                             />
//                           </Grid>
//                         </Grid>
//                       </AccordionDetails>
//                     </Accordion>
//                     <Accordion defaultExpanded sx={{ marginTop: '30px' }}>
//                       <CardHeader title={<Typography>{t('government_info')}</Typography>} />
//                       <Divider />
//                       <AccordionDetails>
//                         <Grid item container xs={12} spacing={2}>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'total_application_fees'}>
//                               {t('total_application_fees')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'total_application_fees' /* , {
//                                 required: `${t('field')} ${t('total_application_fees')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='total_application_fees'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-total_application_fees'
//                               error={!!errors.total_application_fees}
//                               helperText={errors.total_application_fees?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'gov_main_applicant_no'}>
//                               {t('gov_main_applicant_no')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'gov_main_applicant_no' /* , {
//                                 required: `${t('field')} ${t('gov_main_applicant_no')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='text'
//                               name='gov_main_applicant_no'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-gov_main_applicant_no'
//                               error={!!errors.gov_main_applicant_no}
//                               helperText={errors.gov_main_applicant_no?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'gov_proccesing_fees'}>
//                               {t('gov_proccesing_fees')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'gov_proccesing_fees' /* , {
//                                 required: `${t('field')} ${t('gov_proccesing_fees')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='gov_proccesing_fees'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-gov_proccesing_fees'
//                               error={!!errors.gov_proccesing_fees}
//                               helperText={errors.gov_proccesing_fees?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>

//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id='gov_office_processes_id'>
//                               {t('gov_office_processes_id')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <Controller
//                               {...register(
//                                 'gov_office_processes_id' /* , {
//                                 required: `${t('field')} ${t('gov_office_processes_id')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               name='gov_office_processes_id'
//                               control={control}
//                               render={({ field: fieldSelect }) => (
//                                 <StyledReactSelect
//                                   isDisabled={isDisableClientId}
//                                   {...fieldSelect}
//                                   options={
//                                     govOfficesList.map((i) => ({
//                                       value: i.id,
//                                       label: i.name,
//                                     })) || []
//                                   }
//                                 />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'gov_receipt_no'}>
//                               {t('gov_receipt_no')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'gov_receipt_no' /* , {
//                                 required: `${t('field')} ${t('gov_receipt_no')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='gov_receipt_no'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-gov_receipt_no'
//                               error={!!errors.gov_receipt_no}
//                               helperText={errors.gov_receipt_no?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'gov_processing_days'}>
//                               {t('gov_processing_days')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'gov_processing_days' /* , {
//                                 required: `${t('field')} ${t('gov_processing_days')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='gov_processing_days'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-gov_processing_days'
//                               error={!!errors.gov_processing_days}
//                               helperText={errors.gov_processing_days?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'gov_proccesing_fees'}>
//                               {t('gov_proccesing_fees')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'gov_proccesing_fees' /*  {
//                                 required: `${t('field')} ${t('gov_proccesing_fees')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='gov_proccesing_fees'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-gov_proccesing_fees'
//                               error={!!errors.gov_proccesing_fees}
//                               helperText={errors.gov_proccesing_fees?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'accompanying_application'}>
//                               {t('accompanying_application')}
//                               {/* <span className='text-danger'> * </span> */}
//                             </InputLabel>
//                             <TextField
//                               {...register(
//                                 'accompanying_application' /* , {
//                                 required: `${t('field')} ${t('accompanying_application')} ${t(
//                                   'is_required',
//                                 )}`,
//                               } */,
//                               )}
//                               type='number'
//                               name='accompanying_application'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-accompanying_application'
//                               error={!!errors.accompanying_application}
//                               helperText={errors.accompanying_application?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                         </Grid>
//                       </AccordionDetails>
//                     </Accordion>

//                     <Accordion defaultExpanded sx={{ marginTop: '30px' }}>
//                       <CardHeader title={<Typography>{t('case_timing')}</Typography>} />
//                       <Divider />
//                       <AccordionDetails>
//                         <Grid item container xs={12} spacing={2}>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'open_date'}>{t('open_date')}</InputLabel>
//                             <Controller
//                               name='open_date'
//                               control={control}
//                               {...register('open_date', {
//                                 required: `${t('field')} ${t('open_date')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.open_date}
//                               helperText={errors.open_date?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'submission_deadline'}>
//                               {t('submission_deadline')}
//                             </InputLabel>
//                             <Controller
//                               name='submission_deadline'
//                               control={control}
//                               {...register('submission_deadline', {
//                                 required: `${t('field')} ${t('submission_deadline')} ${t(
//                                   'is_required',
//                                 )}`,
//                               })}
//                               error={!!errors.submission_deadline}
//                               helperText={errors.submission_deadline?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'decision_at'}>{t('decision_at')}</InputLabel>
//                             <Controller
//                               name='decision_at'
//                               control={control}
//                               {...register('decision_at', {
//                                 required: `${t('field')} ${t('decision_at')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.decision_at}
//                               helperText={errors.decision_at?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>

//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'submitted_at'}>{t('submitted_at')}</InputLabel>
//                             <Controller
//                               name='submitted_at'
//                               control={control}
//                               {...register('submitted_at', {
//                                 required: `${t('field')} ${t('submitted_at')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.submitted_at}
//                               helperText={errors.submitted_at?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'target_date'}>{t('target_date')}</InputLabel>
//                             <Controller
//                               name='target_date'
//                               control={control}
//                               {...register('target_date', {
//                                 required: `${t('field')} ${t('target_date')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.target_date}
//                               helperText={errors.target_date?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'expected_at'}>{t('expected_at')}</InputLabel>
//                             <Controller
//                               name='expected_at'
//                               control={control}
//                               {...register('expected_at', {
//                                 required: `${t('field')} ${t('expected_at')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.expected_at}
//                               helperText={errors.expected_at?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'internal_processing_days'}>
//                               {t('internal_processing_days')}
//                             </InputLabel>
//                             <TextField
//                               {...register('internal_processing_days')}
//                               type='number'
//                               name='internal_processing_days'
//                               variant='filled'
//                               fullWidth
//                               autoComplete='new-internal_processing_days'
//                               error={!!errors.internal_processing_days}
//                               helperText={errors.internal_processing_days?.message}
//                               onChange={onInputChange}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'next_review'}>{t('next_review')}</InputLabel>
//                             <Controller
//                               name='next_review'
//                               control={control}
//                               {...register('next_review', {
//                                 required: `${t('field')} ${t('next_review')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.next_review}
//                               helperText={errors.next_review?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={6} md={4}>
//                             <InputLabel id={'retainer_date'}>{t('retainer_date')}</InputLabel>
//                             <Controller
//                               name='retainer_date'
//                               control={control}
//                               {...register('retainer_date', {
//                                 required: `${t('field')} ${t('retainer_date')} ${t('is_required')}`,
//                               })}
//                               error={!!errors.retainer_date}
//                               helperText={errors.retainer_date?.message}
//                               render={({ field: fieldDatePicker }) => (
//                                 <CDatePicker {...fieldDatePicker} />
//                               )}
//                             />
//                           </Grid>
//                         </Grid>
//                       </AccordionDetails>
//                     </Accordion>

//                     <Accordion defaultExpanded sx={{ marginTop: '30px' }}>
//                       <CardHeader title={<Typography>{t('description')}</Typography>} />
//                       <Divider />
//                       <AccordionDetails>
//                         <Grid item container xs={12} spacing={2}>
//                           <Grid item xs={12} sm={12} md={12}>
//                             <InputLabel id={'description'}>{t('description')}</InputLabel>
//                             <TextareaAutosize
//                               {...register('description')}
//                               onChange={onInputChange}
//                               aria-label='empty textarea'
//                               placeholder=''
//                               name='description'
//                               label='description'
//                               style={{ width: '100%' }}
//                               minRows={5}
//                               fullWidth
//                               autoComplete='new-description'
//                               error={!!errors.description}
//                               helperText={errors.description?.message}
//                             />
//                           </Grid>
//                         </Grid>
//                       </AccordionDetails>
//                     </Accordion>
//                   </Grid>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Button
//                     type='submit'
//                     color='iconverde'
//                     className='circular-btn'
//                     size='large'
//                     fullWidth
//                   >
//                     Guardar
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </form>
//         </Card>
//       )}
//     </FormGroup>
//   );
 };
