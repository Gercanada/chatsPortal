import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import GridTable from '../../../components/Tables/GridTable';
import { Button, Card, Grid, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ModalForm from '../../../components/Modal/ModalForm';
import { createUser } from '../../../store/slices/users';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const { isLightTheme } = useSelector((state) => state.ui);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
    onInputChange,
    watch,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {},
  });

  const details = [
    { name_: 'Nombre', key: 'name', allowEdit: false, type: 'text' },
    {
      name_: 'Apellido',
      key: 'last_name',
      allowEdit: false,
      type: 'text',
    },
    { name_: 'Email', key: 'email', allowEdit: false, type: 'email' },
    { name_: 'username', key: 'username', allowEdit: false, type: 'text' },
    { name_: t('password'), key: 'password', allowEdit: false, type: 'password'},
    {
      name_: t('confirm_password'),
      key: 'confirmPassword',
      allowEdit: false,
      type: 'password',
    },
    {
      name_: t('avatar'),
      key: 'avatar',
      allowEdit: false,
      type: 'avatar',
    },
  ];

  const onSubmit = async (formDataParam) => {
    console.log('formDataParam', formDataParam);
    if(formDataParam.password === formDataParam.confirmPassword){
        delete formDataParam.confirmPassword
        const resp = dispatch(createUser(formDataParam))
        if(resp.status === 200 ) {
            toast.success(t('saved'))
        }else{
            toast.error(t('error'))
        }
    }
  };

  return (
    <DashboardLayout>
      <ModalForm
        open={openModal}
        onClose={setOpenModal}
        dataForm={details}
        //  selectValues={selectCountries}
        onSubmit={onSubmit}
        title={t('create_contact')}
        // toScreen={toScreen}
      />
      <Card sx={{ marginTop: '10px', marginLeft: '5px', marginRight: '5px' }}>
        <Grid container sx={{ display: 'flex' }}>
          <Grid item xs={6}></Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'end' }} item xs={6}>
            <Button
              sx={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
              size='large'
              color='iconverde'
              onClick={(event) => {
                setOpenModal(true);
              }}
            >
              <NoteAddIcon color='iconw'></NoteAddIcon>
              <Typography sx={{ paddingLeft: '10px' }} color='white' variant='h2'>
                {t('create_user')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '5px', marginRight: '5px' }}>
        <Grid container>
          <GridTable
            path='/users'
            title={t('users')}
            group='/users'
            prefix='users'
            //isReloadData={isReloadData}
            columns={[
              {
                field: 'username',
                headerName: t('username'),
                sortable: false,
                // renderCell: (params) => (
                //   <Link
                //     style={{ color: isLightTheme === false ? 'white' : '' }}
                //     to={`/contacts/${params.id}`}
                //   >
                //     {params.value}
                //   </Link>
                // ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'name',
                headerName: t('name'),
                sortable: false,
                // renderCell: (params) => (
                //   <Link
                //     style={{ color: isLightTheme === false ? 'white' : '' }}
                //     to={`/contacts/${params.id}`}
                //   >
                //     {params.value}
                //   </Link>
                // ),
                flex: 1,
                align: 'center',
              },
              {
                field: 'last_name',
                headerName: t('last_name'),
                sortable: false,
                flex: 1,
                // renderCell: (params) => (
                //   <Link
                //     style={{ color: isLightTheme === false ? 'white' : '' }}
                //     to={`/contacts/${params.id}`}
                //   >
                //     {params.value}
                //   </Link>
                // ),
                align: 'center',
              },
              { field: 'email', headerName: t('email'), flex: 1, align: 'center', sortable: false },
            ]}
          />
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default UsersPage;
