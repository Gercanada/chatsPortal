import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';
import CDatePicker from '../../dashboard/components/CDatePicker';
import CButton from '../Button/CButton';
import DInput from '../Input/DInput';

const ModalForm = ({
  open,
  onClose,
  dataForm,
  title,
  //selectValues,
  selectValues,
  onSubmit,
  toScreen,
  setIsEdit,
  isEdit,
  data,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    onInputChange,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {}
  });
  const { t } = useTranslation();
  const [fieldsValues, setFieldsValues] = useState([]);
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overFlowY: 'visible',
  };

  const setDefaultValues = async () => {
    try {
      if (dataForm) {
        Object.entries(dataForm).forEach(([key, value]) => {
          if (key === 'status_id' && value) {
            setValue(key, { value: value?.id, label: value?.value });
          } else if (key === 'schools_id' && value) {
            setValue(key, { value: value?.id, label: value?.value });
          } else {
            let setVal = null;
            if (typeof value.value !== 'undefined' && value.value !== null) {
              if (typeof value.value === 'object') {
                // if (Object.keys(value).includes('ref')) {
                //   setVal = value?.ref.split('/')[4];
                // }
              } else {
                setVal = value;
              }
              setValue(setVal.key, setVal.value);
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFieldsValues(dataForm);
    setDefaultValues();
  }, [dataForm, isEdit]);

  const handleClose = () => {
    onClose(false);
    setIsEdit(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overFlowY: 'visible' }}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
            >
              <Typography variant='h4'>{title}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ display: 'flex' }}>
            {dataForm &&
              dataForm?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.type === 'date' ? (
                    <Grid
                      item
                      xs={12}
                      md={5.8}
                      sx={{ marginTop: '8px', marginLeft: '5px' }}
                      key={index}
                    >
                      <InputLabel>
                        {t(item.key)}
                        <span className='text-danger'> * </span>
                      </InputLabel>
                      <Controller
                        name={item.key}
                        control={control}
                        render={({ field: fieldDatePicker }, ref) => (
                          <CDatePicker {...fieldDatePicker} inputRef={ref} isRequired={true} />
                        )}
                      />
                    </Grid>
                  ) : item.type === 'select' ? (
                    selectValues && (
                      <Grid
                        item
                        xs={12}
                        md={5.8}
                        sx={{ marginTop: '8px', marginLeft: '5px' }}
                        key={index}
                      >
                        <InputLabel>
                          {t(item.key)}
                          <span className='text-danger'> * </span>
                        </InputLabel>
                        <Controller
                          name={item.key}
                          control={control}
                          defaultValue={
                            isEdit
                              ? { value: item?.value?.id, label: item?.value?.value }
                              : t('select')
                          }
                          render={({ field: fieldSelect }) => (
                            <StyledReactSelect
                              {...fieldSelect}
                              options={selectValues
                                ?.get(item.key)
                                .map((optionSelect) => optionSelect)}
                            />
                          )}
                        />
                      </Grid>
                    )
                  ) : item.type === 'avatar' ? (
                    <Grid
                      item
                      xs={12}
                      md={5.8}
                      sx={{ marginTop: '8px', marginLeft: '5px' }}
                      key={index}
                    >
                      <InputLabel>
                        {item.name_}
                        <span className='text-danger'> * </span>
                      </InputLabel>
                      <TextField
                        type='file'
                        variant='filled'
                        fullWidth
                        inputProps={{ accept: 'image/*' }}
                        {...register('avatar')}
                      />
                    </Grid>
                  ) : item.type === 'password' || item.type === 'confirm_password' ? (
                    <Grid
                      item
                      xs={12}
                      md={5.8}
                      sx={{ marginTop: '8px', marginLeft: '5px' }}
                      key={index}
                    >
                      <DInput data={item} register={register} />
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      md={5.8}
                      sx={{ marginTop: '8px', marginLeft: '5px' }}
                      key={index}
                    >
                     <InputLabel>
                          {t(item.key)}
                          <span className='text-danger'> * </span>
                        </InputLabel>
                      <TextField
                        {...register(`${item?.key}`, {
                          required: `${t('field')} ${item?.name_} ${t('is_required')}`,
                        })}
                        sx={{ width: '100%' }}
                        label={t(item?.name_)}
                        name={item?.key}
                        type={'text'}
                        //  defaultValue={item?.value || ''}
                        defaultValue={watch(item?.key)}
                        variant='filled'
                        //  onChange={onInputChange}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
            {toScreen && (
              <CButton
                title={t('change_password')}
                type='button'
                size='large'
                sx={{ margin: '10px', width: '30%' }}
                color='primary'
                onClick={toScreen}
              >
                {t('go_to_full_screen')}
              </CButton>
            )}
            <Button
              type='submit'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
            >
              {t('save')}
            </Button>
            <CButton
              type='button'
              size='large'
              sx={{ margin: '10px', width: '30%' }}
              color='primary'
              onClick={handleClose}
            >
              {t('cancel')}
            </CButton>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
