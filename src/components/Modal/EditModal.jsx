import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputLabel, TextField } from '@mui/material';
import CDatePicker from '../../dashboard/components/CDatePicker';
import StyledReactSelect from '../../dashboard/components/StyledReactSelect';

const EditModal = ({ data, selectValues }) => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        onInputChange,
      } = useForm({
        defaultValues: {},
      });
      const { t } = useTranslation();
  return (
    <>
      <Grid container sx={{ display: 'flex', justifyContent: isPassword ? 'center' : '' }}>
        {data?.map((item, index) =>
          item.type === 'text' ? (
            <Grid item xs={12} md={5.8} sx={{ marginTop: '8px', marginLeft: '5px' }} key={index}>
              <DInput register={register} data={item} />
            </Grid>
          ) : item.type === 'select' ? (
            <Grid item xs={12} md={5.8} sx={{ marginTop: '8px', marginLeft: '5px' }} key={index}>
              <InputLabel>
                {t(item.key)}
                <span className='text-danger'> * </span>
              </InputLabel>
              <Controller
                name={item.key}
                control={control}
                // defaultValue={
                //   isEdit ? { value: item?.value?.id, label: item?.value?.value } : t('select')
                // }
                render={({ field: fieldSelect }) => (
                  <StyledReactSelect
                    {...fieldSelect}
                    options={selectValues?.get(item.key).map((optionSelect) => optionSelect)}
                  />
                )}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={5.8} sx={{ marginTop: '8px', marginLeft: '5px' }} key={index}>
              <Controller
                name={item?.key}
                control={control}
                render={({ field: fieldDatePicker }, ref) => (
                  <CDatePicker {...fieldDatePicker} inputRef={ref} />
                )}
              />
            </Grid>
          ),
        )}
      </Grid>
    </>
  );
};

export default EditModal;
