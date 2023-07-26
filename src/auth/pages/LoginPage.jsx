import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import CButton from '../../components/Button/CButton';
import { validations } from '../../helpers';
import { startLogin } from '../../store/slices/auth';
import { AuthLayout } from '../layout/AuthLayout';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const {t} = useTranslation();
  const CustomButton = ({ setIsVisible }) => (
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      user_name: localStorage.getItem('user_name') || '',
      password: '',
      rememberme: true,
    },
  });

  const onRemembermeChange = () => {
    const remembermeCurrent = getValues('rememberme');
    setValue('rememberme', !remembermeCurrent, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (formData) => {
    if (formData.rememberme) {
      localStorage.setItem('user_name', formData.user_name);
    } else {
      localStorage.removeItem('user_name');
    }
    setLoading(true);
    const res = await dispatch(startLogin(formData));
    if(res){
      toast.error(t('wrong_credentials'));
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <FormGroup>
        <Card
          className='animate__animated animate__fadeIn'
          sx={{ maxWidth: '400px' }}
          item
          container
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                padding: '30px 20px',
                borderRadius: '3px',
              }}
              className='summary-card'
            >
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12}>
                  <Typography
                    variant='h1'
                    component='h1'
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <img
                      style={{ paddingBottom: '40px' }}
                      src='/images/LOGOPORTAL.png'
                      width='250px'
                      alt=''
                    />
                  </Typography>
                  <Typography
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    variant='h1'
                    component='h1'
                  >
                   {t('sign_in')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='user_name'
                    label={t('username')}
                    variant='filled'
                    fullWidth
                    autoComplete='new-user_name'
                    {...register('user_name', {
                      required: t('enter_user'),
                      // validate: (val) => validations.isValiduser_name(val),
                    })}
                    error={!!errors.user_name}
                    helperText={errors.user_name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={isVisible === true ? 'text' : 'password'}
                    label={t('password')}
                    variant='filled'
                    fullWidth
                    autoComplete='new-password'
                    {...register('password', {
                      required: t('enter_password'),
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: <CustomButton setIsVisible={setIsVisible} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    onChange={onRemembermeChange}
                    control={<Checkbox checked={getValues('rememberme')} />}
                    label={t('remember_me')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CButton
                    type='submit'
                    color='secondary'
                    className='circular-btn'
                    size='large'
                    fullWidth
                    loading={loading}
                  >
                    {t('login_in')}
                  </CButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Card>
      </FormGroup>
    </AuthLayout>
  );
};
