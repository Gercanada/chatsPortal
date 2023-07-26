import { Button, Card, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { DashboardLayout } from '../../layouts/DashboardLayout';


import PasswordIcon from '@mui/icons-material/Password';
import { getUser } from '../../../store/slices/users';
import { Grid } from 'semantic-ui-react';
import { changePassword } from '../../../store/slices/clients/thunks';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from 'react-toastify';
import ModalForm from '../../../components/Modal/ModalForm';




export const ProfileDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState();
  const onNavigateBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const {userDetails, loading}= useSelector((state)=>state.users)

  const details = userDetails;

  const modalDetails = [
    { name_: t('new_password'), key: 'new_password', allowEdit: false, type: 'password', fetch_to: '' },
    { name_: t('confirm_password'), key: 'confirmPassword', allowEdit: false, type: 'password', fetch_to: ''},
  ];

  const getShowData =  async() => {
    const resp = await dispatch(getUser());
    setTitle(resp?.contact?.username)
  };

  useEffect(() => {
    getShowData();

  }, [id]);

  const onSubmit = async (formDataParam) => {
  const res = await dispatch(changePassword(formDataParam, `resource/users`));
  if(res?.status === 200 ){
    toast.success(t('password_changed'))
    setOpenModal(false);
  }else{
    toast.error(t('passwords_no_match'))
  }

}
  return (
    <DashboardLayout>
              <ModalForm
              toFullAvaliable={false}
            open={openModal}
            isPassword={true}
            onClose={setOpenModal}
            dataForm={modalDetails}
            onSubmit={onSubmit}
            title={t('change_password')}
          />
      <Card sx={{ mt: 2, padding: 2, display:'flex', justifyContent:'space-between' }}>
      
      <Typography variant='h1'>
          <IconButton onClick={onNavigateBack}>
            <KeyboardBackspaceIcon fontSize='large' />
          </IconButton>
          {title}
        </Typography>
        <Grid sx={{ display:'flex', justifyContent:'space-between' }}>
      
        <Button
          sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
          size='large'
          color='primary'
          onClick={(event) => {
                    setOpenModal(true);
                  }}
        >
          <Typography sx={{ paddingRight: '10px' }} color='white' variant='h2'>
            {t('change_password')}
          </Typography>
          <PasswordIcon color='iconw'></PasswordIcon>
        </Button>
        
      </Grid>
      </Card>
      <Card sx={{ mt: 1, mb: 1 }}>
        <Outlet context={[id, details, { type: 'profile' }]} />
        {/* {modalbody} */}
        {loading && <Loader />} 
      </Card>
    </DashboardLayout>
  );
};
