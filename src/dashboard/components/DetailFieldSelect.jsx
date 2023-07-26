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
import StyledReactSelect from './StyledReactSelect';
import { getOptionsInDFHelper, updateSelectValue } from '../../store/slices/detailFieldHelper';

const DetailFieldSelect = ({ field }) => {
  const {
    key,
    fetch_options_url,
    store_key,
    mapping_response_key,
    value,
    url_put_for_save,
    method = 'PUT',
    onFinish
  } = field;
  const { optionsMap } = useSelector((state) => state.detailFieldHelper);

  const [editable, setEditable] = useState(false);
  const [selectValue, setSelectedValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { control, register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (formDataParam) => {
    if (formDataParam?.key_form && formDataParam?.key_form?.value) {
      setLoading(true);
      await dispatch(
        updateSelectValue({ url_put_for_save, key, value: formDataParam?.key_form?.value, method }),
      );
      setLoading(false);
      setEditable(false);
      onFinish();
    } else {
      setEditable(false);
    }
    if (field?.onFinish && field?.onFinish) {
      field.onFinish();
    }
  };

  const getOptions = () => {
    if (!isOptionsReady()) {
      if (fetch_options_url) {
        dispatch(getOptionsInDFHelper({ url: fetch_options_url, store_key: store_key }));
      } else {
      }
    }
    return {
      languages: [
        { key: 'en', data: 'ENGLISH' },
        { key: 'es', data: 'Español' },
      ],
    };
  };

  const doSetSelectedValue = () => {
    if (isOptionsReady() && value) {
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
   
    if( mapping_response_key==='statuses'){
      const temp = optionsMap[mapping_response_key].find((i) => parseInt(i.id, 10) === parseInt(value, 10));
      return { value: temp?.id, label: 'l' };
    }
    if (isOptionsReady() && value) {
    
      const temp = optionsMap[store_key].find((i) => parseInt(i.id, 10) === parseInt(value, 10));
      return { value: temp.id, label: temp[mapping_response_key] };
    }
  };

  const getOptionsMap = () => {
    if (isOptionsReady() && value) {
      return optionsMap[store_key].map((i) => ({
        value: i.id,
        label: i[mapping_response_key],
      }));
    }
    return [];
  };

  const isOptionsReady = () => {
    if(optionsMap[mapping_response_key]){
      return (
        optionsMap[mapping_response_key] &&
        Array.isArray(optionsMap[mapping_response_key]) &&
        optionsMap[mapping_response_key].length > 0
      );
    }else{
    return (
      optionsMap[store_key] &&
      Array.isArray(optionsMap[store_key]) &&
      optionsMap[store_key].length > 0
    );
   }
  };

  useEffect(() => {
    doSetSelectedValue();
  }, [value, optionsMap[store_key]?.length]);

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid item>
        <ButtonGroup
          disableElevation
          variant='contained'
          aria-label='Disabled elevation buttons'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='p' sx={{ fontWeight: 'bold', width: '30%', paddingLeft: '5px' }}>
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
              variant='p'
              sx={{ width: '50%', paddingLeft: '5px', borderBottom: 'solid #CECECE 1px',     display: "flex", justifyContent: "center"   }}
              onMouseOver={() => setShowComponent(true)}
              onMouseOut={() => setShowComponent(false)}
              onClick={() => {
                setEditable(!editable);
                setShowComponent(false);
              }}
            >
              {selectValue}
              {showComponent ? <EditOutlined /> : ''}
            </Typography>
          )}
          {editable && !loading && (
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
            editable ? 
            <Tooltip title={t('cancel')}>
              <IconButton
                sx={{ width: '10%' }}
                onClick={() => setEditable(!editable)}
                variant='contained'
                color={'error'}
              >
                {<CancelIcon />}
              </IconButton>
            </Tooltip> : ""
          )}
        </ButtonGroup>
      </Grid>
    </form>
  );
};

export default DetailFieldSelect;
