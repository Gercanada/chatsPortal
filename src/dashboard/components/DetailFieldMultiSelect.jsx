import React from 'react';
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
import { getCountries, updateContact } from '../../store/slices/contacts';

const DetailFieldMultiSelect = ({ field }) => {
  const { key,id, fetch_options_url, selects, value, method = 'PUT', onFinish,url_put_for_save } = field;

  const { countries } = useSelector((state) => state.contacts);
  const selectCountries = countries.map((i) => ({ value: i.id, label: i.name })); //Country || other country


  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {},
  });

  const setDefaultValues = () => {
    if(key === 'nationalities'){
      setValue(
        key,
        value.map((i) => ({ value: i.id, label: i.value })),
      );
    }else {
      
     value && setValue(
      key,
      value.map((i) => ({ value: i.id, label: i.name })),
    );
    }
    
  };

  const onSubmit = async (formDataParam) => {
    const formData = {};
    Object.keys(formDataParam).forEach((item) => {
      formData[item] = `[${formDataParam[item].map((i) => i.value).toString()}]`;
    })
    if (formDataParam) {
      setLoading(true);
      await dispatch(updateContact({ url_put_for_save, key:key, payload:formData, method,idContact:id }));
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

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    setDefaultValues();
  }, [value?.length]);

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
          {editable ? (
            <Box sx={{ width: '90%' }}>
              <Controller
                // {...register(key)}
                name={key}
                control={control}
                render={({ field: fieldSelect }) => (
                  <StyledReactSelect
                    isMulti
                    {...fieldSelect}
                    options={selects.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                )}
              />
            </Box>
          ) : (
            <Typography
              variant='p'
              sx={{
                width: '50%',
                paddingLeft: '5px',
                borderBottom: 'solid #CECECE 1px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onMouseOver={() => setShowComponent(true)}
              onMouseOut={() => setShowComponent(false)}
              onClick={() => {
                setEditable(!editable);
                setShowComponent(false);
              }}
            >
            
              { key ==='nationalities' ? value.map(
                (item, index) => `${item.value}${index === value.length - 1 ? '.' : ', '}`,
              ) :  value ? value.map(
                (item, index) => `${item.name}${index === value.length - 1 ? '.' : ', '}`,
              ) :""  }
              {showComponent ? <EditOutlined /> : ''}
            </Typography>
          )}
          {editable && !loading && (
            <Tooltip title={t('save_changes')}>
              <IconButton type='submit' sx={{ width: '10%' }} variant='contained' color='success'>
                <CheckIcon/>
              </IconButton>
            </Tooltip>
          )}
          {loading ? (
            <Tooltip title={t('loading')} style={{ marginLeft: 20 }}>
              <CircularProgress size={22} />
            </Tooltip>
          ) : editable ? (
            <Tooltip title={t('cancel')}>
              <IconButton
                sx={{ width: '10%' }}
                onClick={() => setEditable(!editable)}
                variant='contained'
                color={'error'}
              >
                {<CancelIcon />}
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </ButtonGroup>
      </Grid>
    </form>
  );
};

export default DetailFieldMultiSelect;
