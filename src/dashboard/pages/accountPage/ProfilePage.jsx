import { Button, Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { getUser } from '../../../store/slices/users';
import { DetailField } from '../../components/DetailField';
import ImageUpload from '../../components/ImageUpload';
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import { updateAvatar, updateProfile } from '../../../store/slices/detailFieldHelper';
import { toast } from 'react-toastify';

export const ProfilePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [id, details, { type }] = useOutletContext();
  const { loading } = useSelector((state) => state.detailFieldHelper);

  const [fields, setFields] = useState({ info: null });

  const onFinishFieldSaved = async () => {
    await dispatch(getUser());
  };

  const [avatar, setAvatar] = useState(null);

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

  const initFields = () => {
    const info = [];

    details?.contact &&
      Object.entries(details?.contact).forEach(([key, val], i) => {
        const field = {
          key,
          val,
          type: 'text',
          fetch_to: 'user/account',
          allowEdit: false,
          onFinish: onFinishFieldSaved,
        };
        switch (field.key) {
          case 'secondaryemail':
            field.allowEdit = true;
            break;
          case 'mobile_phone':
            field.allowEdit = true;
            break;
          case 'whatsapp_no':
            field.allowEdit = true;
            break;
          case 'skype':
            field.allowEdit = false;
            break;
          case 'facebook':
            field.allowEdit = false;
            break;
          case 'instagram':
            field.allowEdit = false;
            break;
          case 'linkedin':
            field.allowEdit = false;
            break;
          case 'user_donotcall':
            field.allowEdit = true;
            break;
          case 'user_emailoptout':
            field.allowEdit = true;
            break;
          case 'avatar':
            setAvatar(val);
            break;
          default:
            break;
        }
        if (
          [
            'first_name',
            'last_name',
            'office_phone',
            'mobile_phone',
            'age',
            'primary_email',
            'secondary_email',
            'date_of_birth',
            'whatsapp_no',
            'skype',
            'facebook',
            'linkedin',
            'instagram',
          ].includes(key)
        ) {
          info.push(
            <Grid item xs={12} md={6} lg={4} key={i}>
              <DetailField key={i} field={field} />
            </Grid>,
          );
        }
      });
    setFields({ info });
  };

  const getShowData = async () => {
    const resp = await dispatch(getUser());
    // setTitle(resp?.contact?.username)
  };

  useEffect(() => {
    initFields();
  }, [details]);

  const onSubmit = async (data) => {
    console.log({ avatar });
    const res = await dispatch(
      updateAvatar({
        value: avatar,
        key: 'avatar',
        // url_put_for_save: 'user/account',
        method: 'POST',
      }),
    );

    if (res?.data) {
      getShowData();
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.files);
    setAvatar(e.target.files);
  };

  return (
    <>
      <Grid sx={{ mt: 1, mb: 1 }} container flexDirection='row'>
        {loading && <Loader />}
        <Grid item container spacing={2}>
          {fields?.info}

   
        </Grid>
        <Grid item xs={12} md={12} lg={10} key='avatar' sx={{display:'flex', mt:1}}>
            <Typography
              className='celular350'
              variant='p'
              sx={{pt:2, maxWidth: '10px', minWidth: '10%', paddingLeft: '5px', fontWeight: 'bold' }}
            >
              {t('avatar')}
            </Typography>
            <TextField
              type='file'
              variant='filled'
              fullWidth
              inputProps={{ accept: 'image/*' }}
              {...register('avatar')}
              onChange={handleOnChange}
            />
            <IconButton
              sx={{ minWidth: '10%', paddingTop: 2 }}
              variant='contained'
              color='success'
              onClick={onSubmit}
            >
              <CheckIcon />
            </IconButton>
          </Grid>
      </Grid>
    </>
  );
};
