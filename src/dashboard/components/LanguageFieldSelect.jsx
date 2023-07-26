import {
  Box,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import StyledReactSelect from './StyledReactSelect';
import { getOptionsInDFHelper, updateSelectValue } from '../../store/slices/detailFieldHelper';

const LanguageFieldSelect = ({ field }) => {
  //TODO ! Crear componente con opciones estaticas para seleccionar idioma y tema . (Las opciones de tema e idioma no se obtendran de una peticion a la api, si no de un array en el componente)
  const { id } = useParams();

  const {
    key,
    fetch_options_url,
    store_key,
    mapping_response_key,
    value,
    url_put_for_save,
    method = 'PUT',
  } = field;

  const { optionsMap, loading } = useSelector((state) => state.detailFieldHelper);

  const [editable, setEditable] = useState(false);
  const [selectValue, setSelectedValue] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { control, register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (formDataParam) => {
    if (formDataParam?.key_form && formDataParam?.key_form?.value) {
      dispatch(
        updateSelectValue({ url_put_for_save, key, value: formDataParam?.key_form?.value, method }),
      );
      setEditable(false);
    } else {
      setEditable(false);
    }
  };

  const getOptions = () => {
    if (!isOptionsReady())
      dispatch(getOptionsInDFHelper({ url: fetch_options_url, store_key: store_key }));
  };

  const doSetSelectedValue = () => {
    if (isOptionsReady()) {
      setSelectedValue(
        optionsMap[store_key].find((i) => parseInt(i.id, 10) === parseInt(value, 10))[
          mapping_response_key
        ],
      );
    } else {
      setSelectedValue('No option');
    }
  };

  const getDefaultValue = () => {
    if (isOptionsReady()) {
      const temp = optionsMap[store_key].find((i) => parseInt(i.id, 10) === parseInt(value, 10));
      return { value: temp.id, label: temp[mapping_response_key] };
    }
  };

  const getOptionsMap = () => {
    return [
      { value: 'en', label: 'EN' },
      { value: 'fr', label: 'FR' },
      { value: 'es', label: 'ES' },
    ];
  };

  const isOptionsReady = () => {
    return (
      optionsMap[store_key] &&
      Array.isArray(optionsMap[store_key]) &&
      optionsMap[store_key].length > 0
    );
  };

  useEffect(() => {
    doSetSelectedValue();
  }, [optionsMap[store_key]?.length]);

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item sx={{}}>
        <ButtonGroup
          disableElevation
          variant='contained'
          aria-label='Disabled elevation buttons'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='h6' sx={{ width: '30%', paddingLeft: '5px' }}>
            {t(key)}
          </Typography>
          {editable && isOptionsReady() ? (
            <Box sx={{ width: '90%' }}>
              <Controller
                {...register('key_form', {})}
                name={'key_form'}
                control={control}
                render={({ field: fieldSelect }) => (
                  <StyledReactSelect
                    defaultValue={getDefaultValue()}
                    {...fieldSelect}
                    options={getOptionsMap()}
                  />
                )}
              />
            </Box>
          ) : (
            <Typography
              variant='subtitle1'
              sx={{ width: '50%', paddingLeft: '5px', borderBottom: 'solid #CECECE 1px' }}
            >
              {selectValue}
            </Typography>
          )}
          {editable && (
            <Tooltip title={t('save_changes')}>
              <IconButton type='submit' sx={{ width: '10%' }} variant='contained' color='success'>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
          {loading ? (
            <Tooltip title={t('loading')} style={{ marginLeft: 20 }}>
              <CircularProgress size={22} />
            </Tooltip>
          ) : (
            <Tooltip title={!editable ? t('edit') : t('cancel')}>
              <IconButton
                sx={{ width: '10%' }}
                onClick={() => setEditable(!editable)}
                variant='contained'
                color={editable ? 'error' : 'primary'}
              >
                {!editable ? <EditOutlined /> : <CancelIcon />}
              </IconButton>
            </Tooltip>
          )}
        </ButtonGroup>
      </Grid>
    </form>
  );
};

export default LanguageFieldSelect;
