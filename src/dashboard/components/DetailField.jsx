import {
  Box,
  ButtonGroup,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { Controller, useForm } from 'react-hook-form';
import CDatePicker from './CDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecordFormData } from '../../store/slices/clients/thunks';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { updateProfile, updateSelectValue } from '../../store/slices/detailFieldHelper';
import { Loader } from '../../components/Loader';

/**
 * Se obtiene el ID actual del usuario de los parámetros de la ruta y se establece el estado "editable" en falso.
 * También se establece un estado interno "internalLoading" en falso y se obtiene una instancia del componente de traducción y
 * una función de despacho de acciones de Redux.
 */
export const DetailField = ({ field }) => {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showComponent, setShowComponent] = useState(false);
  const { loading } = useSelector((state) => state.detailFieldHelper);
  const defaultValueParam = {};
  defaultValueParam[field.key] = field.val;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    onInputChange,
  } = useForm({
    defaultValues: { ...defaultValueParam },
  });
  // setValue(field.key, field.val);

  const style = {
    minWidth: '50%',
    paddingLeft: '5px',
    borderBottom: 'solid #CECECE 1px',
    display: 'flex',
    justifyContent: 'center',
  };

  /**
   * un formulario con "useForm" de "react-hook-form" y se establece el valor del campo en el valor actual del campo.
   */
  const onSubmit = async (formDataParam) => {
    setEditable(!editable);
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
      } else {
        formData[item] = formDataParam[item];
      }
    });
    if (Object.keys(formData).includes(field.key)) {
      const value1 = formData[field.key];
      const res = await dispatch(
        updateProfile({
          value: value1,
          key: field.key,
          url_put_for_save: field.fetch_to,
          method: 'POST',
        }),
      );
      if (res) {
        field.onFinish();
      }
    }
  };

  /**En esta función se determina si el botón de edición se muestra o no, y si es así,
   * se muestra un indicador de carga o un botón de edición o cancelación.
   */
  const component = () => {
    let editableField;
    if (editable && field?.allowEdit) {
      editableField = //Editable
        (
          <Box sx={{ width: '90%' }} key={field?.key}>
            {loading && <Loader />}
            {showComponent ? <EditOutlined /> : ''}
            {['text', 'number', 'email', 'file'].includes(field?.type) &&
              (field.key !== 'notes' ? (
                <TextField
                  variant='standard'
                  sx={{ paddingTop: '5px', paddingBottom: '5px' }}
                  name={field?.key}
                  {...register(field?.key, {})}
                  type={field?.type || 'text'}
                  fullWidth
                  autoComplete={`new-image`}
                  error={!!errors[field?.key]}
                  helperText={errors[field?.key]?.message}
                  onChange={onInputChange}
                />
              ) : (
                <TextareaAutosize
                  {...register('notes')}
                  onChange={onInputChange}
                  aria-label='empty textarea'
                  placeholder='some Description'
                  name='notes'
                  style={{ width: '100%' }}
                  minRows={3}
                />
              ))}
            {field?.type === 'date' && (
              <Controller
                name={field?.key}
                control={control}
                {...register(field?.key)}
                error={!!errors[field?.key]}
                helperText={errors[field?.key]?.message}
                render={({ field: { fieldDatePicker } }) => (
                  <CDatePicker variant='standard' {...fieldDatePicker} />
                )}
              />
            )}
            {field?.type === 'radio' && (
              <RadioGroup row aria-labelledby={field?.key} name={field?.key}>
                <FormControlLabel
                  {...register(field?.key)}
                  value={1}
                  control={<Radio />}
                  label='si'
                />
                <FormControlLabel
                  {...register(field?.key)}
                  value={0}
                  control={<Radio />}
                  label='no'
                />
              </RadioGroup>
            )}
          </Box>
        );
    } else {
      //No editable
      editableField = field.allowEdit ? (
        field.type !== 'radio' ? (
          <Grid
            sx={style}
            item
            onMouseOver={() => setShowComponent(true)}
            onMouseOut={() => setShowComponent(false)}
          >
            <Typography
              variant='p'
              className='celular3502'
              // sx={style}
            >
              <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                {typeof field.val === 'object' ? (
                  field?.val?.value
                ) : field.val === 0 ? (
                  <CancelIcon color='error' />
                ) : field.val === 1 ? (
                  <CheckIcon color='success' />
                ) : (
                  field.val
                )}
                {showComponent ? (
                  <EditOutlined
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setEditable(!editable);
                      setShowComponent(false);
                    }}
                  />
                ) : (
                  ''
                )}
              </Grid>
            </Typography>
          </Grid>
        ) : (
          <Typography
            sx={style}
            onMouseOver={() => setShowComponent(true)}
            onMouseOut={() => setShowComponent(false)}
            onClick={() => {
              setEditable(!editable);
              setShowComponent(false);
            }}
          >
            <Grid
              sx={{
                minWidth: '50%',
                paddingLeft: '5px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {typeof field.val === 'object' ? (
                field?.val?.value
              ) : field.val === 0 ? (
                <CancelIcon color='error' />
              ) : field.val === 1 ? (
                <CheckIcon color='success' />
              ) : (
                field.val
              )}
              {showComponent ? <EditOutlined /> : ''}
            </Grid>
          </Typography>
        )
      ) : field?.key !== 'instagram' &&
        field?.key !== 'skype' &&
        field?.key !== 'facebook' &&
        field?.key !== 'linkedin' ? (
        <Typography variant='p' sx={style}>
          <Grid item sx={{ display: 'flex' }}>
            {typeof field.val === 'object' ? t(field?.val.value) : t(field?.val)}
            {showComponent ? <EditOutlined /> : ''}
          </Grid>
        </Typography>
      ) : (
        <Typography variant='body1' component='a' href={field?.val} target='_blank'>
          {field?.val}
        </Typography>
      );
    }

    return (
      <>
        <Typography
          className='celular350'
          variant='p'
          sx={{ maxWidth: '10px', minWidth: '30%', paddingLeft: '5px', fontWeight: 'bold' }}
        >
          {t(field?.key)}
        </Typography>
        {editableField}
        {editable && (
          <>
            <Tooltip title={t('save_changes')}>
              <IconButton
                type='submit'
                sx={{ minWidth: '10%' }}
                variant='contained'
                color='success'
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
            <Tooltip>
              <IconButton
                sx={{ minWidth: '10%' }}
                variant='contained'
                color='error'
                onClick={() => setEditable(!editable)}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item>
        <ButtonGroup
          disableElevation
          variant='contained'
          aria-label='Disabled elevation buttons'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {component()}
        </ButtonGroup>
      </Grid>
    </form>
  );
};
