import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ErrorReactSelect from '../../components/ErrorReactSelect';

const DInput = ({ data, register, errors, control, onInputChange }) => {
  const PasswordViewer = ({ setIsVisible }) => (
    <Button
      variant='contained'
      onClick={() => {
        setIsVisible(!isVisible);
      }}
    >
      <RemoveRedEyeIcon />
    </Button>
  );

  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <Grid container item xs={12} md={12}>
      <InputLabel>
        {data?.name_}
        <span className='text-danger'> * </span>
      </InputLabel>
      {data?.type !== 'radio' && data?.type !== 'password' ? (
        <>
          <TextField
            {...register(`${data?.key}`, {
              required: `${t('field')} ${data.name_} ${t('is_required')}`,
            })}
            sx={{ width: '100%' }}
            type={data.type}
            name={data.key}
            variant='filled'
            onChange={onInputChange}
          />
        </>
      ) : data.type === 'radio' ? (
        <RadioGroup row aria-labelledby={'active'} defaultValue={'1'} name={`active`}>
          <FormControlLabel {...register('active')} value={1} control={<Radio />} label='si' />
          <FormControlLabel {...register('active')} value={0} control={<Radio />} label='no' />
        </RadioGroup>
      ) : (
        <>
          <TextField
            {...register(`${data?.key}`, {
              required: `${t('field')} ${data?.name_} ${t('is_required')}`,
            })}
            sx={{ width: '100%' }}
            label={t(data.name_)}
            type={isVisible === true ? 'text' : 'password'}
            name={data.key}
            control={control}
            variant='filled'
            InputProps={{
              endAdornment: <PasswordViewer setIsVisible={setIsVisible} />,
            }}
            onChange={onInputChange}
            error={!!errors[data.key]}
            helperText={errors[data.key]?.message}
          />
        </>
      )}
    </Grid>
  );
};

export default DInput;
